---
status: Draft
owner: 待指定
scope: organization
last_reviewed: 2026-06-15
---

# Docs Quality Automation

**状态：Draft**

**Owner：待指定**

## 背景与目标

Evolution Handbook 是公共组织级文档库。本次优化前已有清晰目录和真源边界，但缺少：

- 文档 CI
- 统一本地检查命令
- 文档结构 自动校验
- 文档 metadata
- ARTI known drift 复核流程

目标：用低噪音自动化保护现状，不大规模重写历史文档。

## 原有方式

主要靠人工 Review：

- 手动检查 Markdown、YAML 和索引
- 手动比对 文档结构 引用
- 用 `**状态：...**` 记录状态
- ARTI shared identifiers 有 known drift，但缺少固定输出物

## 引入的实践

1. Docs CI baseline
   - `npm run check`
   - `.github/workflows/docs.yml`

2. 文档结构 validator
   - 校验字段、ID、引用、重复 remote 和安全边界

3. Metadata dual-track
   - `scripts/validate-doc-metadata.mjs`
   - 新文档可用 frontmatter，旧文档渐进迁移

4. ARTI Known Drift Review
   - `projects/arti/playbooks/known-drift-review.md`
   - `ARTI-D007`

## 责任分配

| 角色 | 责任 |
|---|---|
| 提交者 | 核对归属、事实、状态和隐私边界 |
| Reviewer | 审查 Owner、证据、真源和例外 |
| CI | 检查 Markdown、YAML、文档结构、metadata |
| Agent | 辅助发现和起草，不替代事实核对 |

## 结果

已完成：

- `npm run check` 作为统一检查入口
- 文档结构 引用和重复 remote 自动校验
- 部分文档带 frontmatter
- shared identifiers 链接 Known Drift Review
- Decision index 登记 `ARTI-D007`

## 限制

- CI 不验证事实正确性。
- metadata 未覆盖所有历史文档。
- 文档结构 validator 不访问远端仓库。
- Known Drift Review 不能替代跨仓测试或共享包。
- `Owner：待指定` 后续仍需明确。

## 可复用结论

- 文档仓库先加低噪音检查，再逐步收紧。
- 文档结构 需要脚本校验。
- metadata 迁移应渐进。
- known drift 先固定 Review 输出，再考虑共享包。

## 证据

- `package.json`
- `.github/workflows/docs.yml`
- `scripts/validate-doc-metadata.mjs`
- `projects/arti/playbooks/known-drift-review.md`
- `projects/arti/decisions/ARTI-D007-shared-identifier-drift-review.md`
