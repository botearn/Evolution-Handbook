import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import YAML from 'yaml';

const root = process.cwd();
const errors = [];
const scanDirectories = [
  'governance',
  'projects/arti/contracts',
  'projects/arti/decisions',
  'projects/arti/playbooks',
];

function fail(message) {
  errors.push(message);
}

function listMarkdownFiles(directory) {
  const absolute = path.join(root, directory);
  if (!fs.existsSync(absolute)) return [];

  return fs.readdirSync(absolute, { withFileTypes: true })
    .flatMap((entry) => {
      const relative = path.join(directory, entry.name);
      if (entry.isDirectory()) return listMarkdownFiles(relative);
      if (entry.isFile() && entry.name.endsWith('.md')) return [relative];
      return [];
    });
}

function parseFrontmatter(source, filePath) {
  if (!source.startsWith('---\n')) return null;
  const end = source.indexOf('\n---\n', 4);
  if (end === -1) {
    fail(`${filePath}: frontmatter 缺少结束分隔符`);
    return null;
  }

  const raw = source.slice(4, end);
  try {
    const data = YAML.parse(raw);
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      fail(`${filePath}: frontmatter 必须是 YAML 对象`);
      return null;
    }
    return data;
  } catch (error) {
    fail(`${filePath}: frontmatter 无法解析：${error.message}`);
    return null;
  }
}

function requireString(data, key, filePath) {
  if (typeof data[key] !== 'string' || data[key].trim() === '') {
    fail(`${filePath}: frontmatter.${key} 必须是非空字符串`);
  }
}

const files = [...new Set(scanDirectories.flatMap(listMarkdownFiles))];

for (const filePath of files) {
  const source = fs.readFileSync(path.join(root, filePath), 'utf8');
  const frontmatter = parseFrontmatter(source, filePath);

  if (!frontmatter) continue;

  requireString(frontmatter, 'status', filePath);
  requireString(frontmatter, 'owner', filePath);
  requireString(frontmatter, 'scope', filePath);

  if ('last_reviewed' in frontmatter) {
    requireString(frontmatter, 'last_reviewed', filePath);
  }

  if ('project' in frontmatter) {
    requireString(frontmatter, 'project', filePath);
  }

  if ('decision_id' in frontmatter) {
    requireString(frontmatter, 'decision_id', filePath);
  }
}

if (errors.length > 0) {
  console.error('文档 metadata 校验失败：');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('Document metadata OK');
