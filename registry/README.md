# Registry

Registry 是给同事和 Agent 用的机器可读目录，回答：有哪些项目、有哪些仓库、归属哪里、默认分支是什么。

## 文件

- [`projects.yaml`](projects.yaml)：项目、状态、Handbook 入口、仓库列表。
- [`repositories.yaml`](repositories.yaml)：仓库远端、职责、归属、生命周期。

## 基本规则

- 顶层使用 `schema_version: 1`。
- ID 使用 kebab-case，例如 `arti-backend`。
- 未知字段写 `unknown`，不要留空或猜测。
- 不写本机路径、账号、Token、私有访问方式或生产凭据。

## Project 字段

| 字段 | 含义 |
|---|---|
| `id` | 项目标识 |
| `name` | 项目名称 |
| `status` | 生命周期状态 |
| `handbook_path` | 项目文档目录 |
| `repositories` | 仓库 ID 列表 |

## Repository 字段

| 字段 | 含义 |
|---|---|
| `id` | 仓库标识 |
| `remote` | 公共远端 URL |
| `project` | 项目 ID、`organization` 或 `unassigned` |
| `responsibility` | 主要职责 |
| `status` | 生命周期状态 |
| `default_branch` | 默认分支 |

## 仓库规则

- 一个仓库应有明确项目归属和生命周期状态。
- 代码和可执行资产是实现事实的真源。
- 活跃代码仓库应有 `README.md` 和平台无关的 `AGENTS.md`。
- 宿主专属文件保持轻量，不重复维护长期规则。
- 生产凭据不得进入仓库。

归档仓库前需要：

1. 标记替代方案或终止原因。
2. 迁移仍被依赖的契约与文档。
3. 更新项目仓库地图和 Registry。
4. 确认没有自动化仍向该仓库发布。

## 什么时候更新

- 创建、迁移、归档或重命名项目和仓库。
- 默认分支或远端地址变化。
- 仓库职责和项目归属变化。
- 项目 Handbook 路径变化。

## 校验

```bash
npm run validate:registry
npm run check
```
