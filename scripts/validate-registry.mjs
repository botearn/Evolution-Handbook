import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';

const root = process.cwd();
const projectRegistryPath = 'registry/projects.yaml';
const repositoryRegistryPath = 'registry/repositories.yaml';
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const allowedSpecialProjects = new Set(['organization', 'unassigned']);
const errors = [];

function fail(message) {
  errors.push(message);
}

function readYaml(relativePath) {
  try {
    const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
    return YAML.parse(source);
  } catch (error) {
    fail(`${relativePath} 无法解析：${error.message}`);
    return null;
  }
}

function requireString(value, fieldPath) {
  if (typeof value !== 'string' || value.trim() === '') {
    fail(`${fieldPath} 必须是非空字符串`);
    return false;
  }
  return true;
}

function requireArray(value, fieldPath) {
  if (!Array.isArray(value)) {
    fail(`${fieldPath} 必须是数组`);
    return false;
  }
  return true;
}

function validateId(id, fieldPath) {
  if (!requireString(id, fieldPath)) return;
  if (!idPattern.test(id)) {
    fail(`${fieldPath} 必须使用稳定 kebab-case：${id}`);
  }
}

function validateRelativePath(value, fieldPath) {
  if (!requireString(value, fieldPath)) return;
  if (path.isAbsolute(value)) {
    fail(`${fieldPath} 不能使用绝对路径：${value}`);
  }
}

function validateRemote(remote, fieldPath) {
  if (!requireString(remote, fieldPath)) return;

  if (/^https?:\/\/[^/\s]+:[^@/\s]+@/i.test(remote)) {
    fail(`${fieldPath} 不能包含用户名密码或 token：${remote}`);
  }

  if (/^git@/i.test(remote)) {
    fail(`${fieldPath} 应使用公共 HTTPS URL，不能使用私有 SSH 访问方式：${remote}`);
  }

  if (/\b(token|secret|password|passwd|apikey|api_key)=/i.test(remote)) {
    fail(`${fieldPath} 不能包含凭据参数：${remote}`);
  }
}

const projectsRegistry = readYaml(projectRegistryPath);
const repositoriesRegistry = readYaml(repositoryRegistryPath);

if (projectsRegistry?.schema_version !== 1) {
  fail(`${projectRegistryPath}.schema_version 必须为 1`);
}

if (repositoriesRegistry?.schema_version !== 1) {
  fail(`${repositoryRegistryPath}.schema_version 必须为 1`);
}

const projects = projectsRegistry?.projects;
const repositories = repositoriesRegistry?.repositories;

if (projectsRegistry && requireArray(projects, `${projectRegistryPath}.projects`)) {
  const seenProjectIds = new Set();

  projects.forEach((project, index) => {
    const base = `${projectRegistryPath}.projects[${index}]`;
    if (!project || typeof project !== 'object' || Array.isArray(project)) {
      fail(`${base} 必须是对象`);
      return;
    }

    validateId(project.id, `${base}.id`);
    requireString(project.name, `${base}.name`);
    requireString(project.status, `${base}.status`);
    validateRelativePath(project.handbook_path, `${base}.handbook_path`);
    requireArray(project.repositories, `${base}.repositories`);

    if (typeof project.id === 'string') {
      if (seenProjectIds.has(project.id)) {
        fail(`${base}.id 重复：${project.id}`);
      }
      seenProjectIds.add(project.id);
    }
  });
}

if (repositoriesRegistry && requireArray(repositories, `${repositoryRegistryPath}.repositories`)) {
  const seenRepositoryIds = new Set();
  const seenRemotes = new Map();

  repositories.forEach((repository, index) => {
    const base = `${repositoryRegistryPath}.repositories[${index}]`;
    if (!repository || typeof repository !== 'object' || Array.isArray(repository)) {
      fail(`${base} 必须是对象`);
      return;
    }

    validateId(repository.id, `${base}.id`);
    validateRemote(repository.remote, `${base}.remote`);
    requireString(repository.project, `${base}.project`);
    requireString(repository.responsibility, `${base}.responsibility`);
    requireString(repository.status, `${base}.status`);
    requireString(repository.default_branch, `${base}.default_branch`);

    if (typeof repository.id === 'string') {
      if (seenRepositoryIds.has(repository.id)) {
        fail(`${base}.id 重复：${repository.id}`);
      }
      seenRepositoryIds.add(repository.id);
    }

    if (typeof repository.remote === 'string') {
      const normalizedRemote = repository.remote.toLowerCase();
      const existing = seenRemotes.get(normalizedRemote);
      if (existing) {
        fail(`${base}.remote 与 ${existing} 重复：${repository.remote}`);
      } else {
        seenRemotes.set(normalizedRemote, `${base}.remote`);
      }
    }
  });
}

if (Array.isArray(projects) && Array.isArray(repositories)) {
  const projectIds = new Set(projects.map((project) => project?.id).filter(Boolean));
  const repositoryIds = new Set(repositories.map((repository) => repository?.id).filter(Boolean));
  const repositoriesByProject = new Map();

  repositories.forEach((repository) => {
    if (!repository?.project || !repository?.id) return;
    if (!repositoriesByProject.has(repository.project)) {
      repositoriesByProject.set(repository.project, new Set());
    }
    repositoriesByProject.get(repository.project).add(repository.id);

    if (!projectIds.has(repository.project) && !allowedSpecialProjects.has(repository.project)) {
      fail(`${repositoryRegistryPath}: repository "${repository.id}" 引用了未知项目 "${repository.project}"`);
    }
  });

  projects.forEach((project) => {
    if (!project?.id || !Array.isArray(project.repositories)) return;
    const reverseRefs = repositoriesByProject.get(project.id) ?? new Set();

    project.repositories.forEach((repositoryId, repoIndex) => {
      const fieldPath = `${projectRegistryPath}: project "${project.id}" repositories[${repoIndex}]`;
      validateId(repositoryId, fieldPath);
      if (!repositoryIds.has(repositoryId)) {
        fail(`${fieldPath} 引用了不存在的仓库 "${repositoryId}"`);
      }
    });

    reverseRefs.forEach((repositoryId) => {
      if (!project.repositories.includes(repositoryId)) {
        fail(`${repositoryRegistryPath}: repository "${repositoryId}" 归属项目 "${project.id}"，但未登记在 ${projectRegistryPath} 的 project.repositories 中`);
      }
    });
  });
}

if (errors.length > 0) {
  console.error('Registry 校验失败：');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('Registry OK');
