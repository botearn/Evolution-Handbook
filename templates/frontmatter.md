# Frontmatter Metadata

**状态：Draft**

新文档建议使用 YAML frontmatter。旧文档可继续保留 `**状态：...**`，后续复审时再迁移。

## 基础字段

```yaml
---
status: Draft
owner: 待指定
scope: organization
last_reviewed: YYYY-MM-DD
---
```

| 字段 | 含义 |
|---|---|
| `status` | 当前状态 |
| `owner` | 负责角色或 `待指定` |
| `scope` | `organization`、`project`、`repository` 或 `domain` |
| `last_reviewed` | 最近核对日期 |

项目级文档可加：

```yaml
project: arti
```

决策文档可加：

```yaml
decision_id: ARTI-D007
date: YYYY-MM-DD
```

## 规则

1. 复制模板后替换占位符。
2. metadata 用于索引和复审，不代表自动晋升。
3. 约束性内容合并前应明确 Owner。
4. 不为了迁移 metadata 大规模重写旧文档。
