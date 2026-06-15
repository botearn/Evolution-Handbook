---
status: Draft
owner: 待指定
scope: project
project: arti
last_reviewed: 2026-06-15
---

# ARTI Cross-Repository Contracts

**状态：Draft**

**Owner：待指定**

## 背景与目标

ARTI 由 Main app、Backend、Poly、CLI 和共享 Supabase 组成。多个仓库共同依赖报告任务、通知、Credits、共享标识符等契约。

目标：把跨仓不变量写清楚，减少“看哪个仓库都像真源”的情况。

## 原有方式

- 事实散在 RFC、migration、代码和历史实现里。
- Agent 或新人容易按单仓局部理解改动。
- 共享 DB、通知类型、Report Type、Symbol 规则有漂移风险。

## 引入的实践

- 建立 `projects/arti/contracts/`。
- 每份 Contract 只写 Owner、不变量、生产者、消费者和变更方式。
- 字段级细节继续链接到代码、migration 或 RFC。
- 对已知漂移新增 Known Drift Review。

## 责任分配

| 角色 | 责任 |
|---|---|
| 项目 Owner | 判断跨仓边界和优先级 |
| 仓库 Owner | 维护本仓真源和验证 |
| Agent | 搜索引用、整理契约、指出漂移 |
| Reviewer | 检查是否复制了第二份真源 |

## 结果

已形成第一批 ARTI 契约：

- `report-tasks.md`
- `report-result.md`
- `credits-and-settlement.md`
- `notifications.md`
- `shared-identifiers.md`

同时补了：

- `shared-database-change.md`
- `known-drift-review.md`
- `ARTI-D007`

## 限制

- 仍有 `Current with Known Drift`。
- 契约不是 schema 真源，不能替代代码检查。
- Owner 还需要进一步明确到团队或角色。
- 还缺跨仓自动漂移测试。

## 可复用结论

- 跨仓 Contract 应写“不变量和变更规则”，不要复制完整实现。
- 已知漂移不要伪装成完成，应单独标出并给复核流程。
- 对 Agent 友好的契约能减少误读，但不能替代 Owner 审查。

## 证据

- `projects/arti/contracts/README.md`
- `projects/arti/contracts/shared-identifiers.md`
- `projects/arti/contracts/notifications.md`
- `projects/arti/playbooks/known-drift-review.md`
- `projects/arti/decisions/ARTI-D007-shared-identifier-drift-review.md`
