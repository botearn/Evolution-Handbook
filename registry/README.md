# Registry

Registry 是供人和 Agent 查询的结构化组织登记表。

## 当前文件

- [`projects.yaml`](projects.yaml)：项目状态及所含仓库
- [`repositories.yaml`](repositories.yaml)：仓库远端、职责和生命周期
- [`schema.md`](schema.md)：Registry schema version 1 和字段说明
- [`repository-policy.md`](repository-policy.md)：仓库登记、归属和归档规则

## 字段要求

项目至少包含：

- `id`
- `name`
- `status`
- `handbook_path`
- `repositories`

仓库至少包含：

- `id`
- `remote`
- `project`
- `responsibility`
- `status`
- `default_branch`

字段未知时应显式标记 `unknown`，不能根据命名猜测。

## 更新时机

- 创建、迁移、归档或重命名项目和仓库
- 默认分支或远端地址变化
- 仓库职责和项目归属变化
- 项目 Handbook 路径变化

## 校验要求

- ID 使用稳定的 kebab-case
- 项目引用和仓库 ID 必须存在
- 同一远端不得重复登记
- YAML 必须可解析
- 公共 Registry 不保存本机路径、账号、Token 或私有访问方式

本地校验：

```bash
npm run validate:registry
```

完整文档检查：

```bash
npm run check
```
