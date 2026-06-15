---
status: Proposed
owner: 待指定
scope: project
project: arti
decision_id: ARTI-D007
date: 2026-06-15
last_reviewed: 2026-06-15
---

# ARTI-D007: Shared Identifier Drift Review

**状态：Proposed**

**Owner：待指定**

**日期：2026-06-15**

## 背景

ARTI 多仓共享 `AnswerKind`、`NotificationKind`、Report Type、Stock Symbol 和 DTO 字段名。部分值已有多份实现或历史 alias，`shared-identifiers.md` 已标记为 `Current with Known Drift`。

## 决策

共享标识符漂移必须按 [Known Drift Review](../playbooks/known-drift-review.md) 复核。

约束：

- 共享字符串是协议，不是展示文案。
- 单仓不得独自引入新的 canonical 值。
- alias、fallback 和双读路径必须有退出条件。
- 影响 Credits、结算、权限或数据完整性的漂移需要升级。
- Review 输出应回写到相关 Contract、Decision 和仓库文档。

## 替代方案

- 各仓自行映射：快，但会扩大隐式协议面。
- 立即共享包化：方向正确，但当前迁移成本较高。
- 只写提醒：不能阻止后续继续漂移。

因此先用 Drift Review 收敛行为，再决定是否共享包化。

## 影响

- 正向：减少跨仓枚举、DTO 和 Symbol 漂移。
- 代价：跨仓改动前多一步复核。
- 影响仓库：`arti`、`ARTI_backend`、`ARTi-poly`、`ARTI-CLI`。

## 实施与验证

1. `shared-identifiers.md` 链接 Known Drift Review。
2. 新增或修改共享标识前列出生产者、消费者、canonical 值和兼容期。
3. 高风险标识补固定用例或跨仓检查。
4. 删除 alias / fallback 前确认生产数据和消费者已迁移。

验证：`npm run check` 通过，相关 PR 链接本决策或 Known Drift Review。

## 取代关系

- Supersedes：无
- Superseded by：无
