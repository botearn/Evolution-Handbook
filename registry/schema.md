# Registry Schema

**状态：Draft**

Registry 用 YAML 登记项目和仓库。当前版本：`schema_version: 1`。

## 文件

- `projects.yaml`：项目、状态、Handbook 入口、仓库列表。
- `repositories.yaml`：仓库远端、职责、归属、生命周期。

## 通用规则

- 顶层必须有 `schema_version: 1`。
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
| `project` | 项目 ID 或特殊值 |
| `responsibility` | 主要职责 |
| `status` | 生命周期状态 |
| `default_branch` | 默认分支 |

## 特殊 project 值

- `organization`：组织级仓库。
- `unassigned`：暂未归入项目。

## 校验

```bash
npm run validate:registry
npm run check
```
