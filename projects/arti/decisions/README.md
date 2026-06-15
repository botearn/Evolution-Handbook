# ARTI Decision Index

这里索引跨仓库长期决策。完整动机和实施细节仍保留在各仓库 RFC。

## 当前决策

| ID | 决策 | 状态 | 主来源 |
|---|---|---|---|
| ARTI-D001 | 重型报告迁到 Railway 三服务架构 | Implementing | [Backend RFC-2026-0001](https://github.com/botearn/ARTI_backend/blob/main/rfcs/2026/RFC-2026-0001-edge-to-railway-migration.md) |
| ARTI-D002 | Credits 扣费由产出结果的服务端入口负责 | Accepted | [arti RFC-0010](https://github.com/iloveopt/arti/blob/main/docs/rfcs/0010-server-authoritative-credits.md) |
| ARTI-D003 | 预测市场主体验同源并收编到主站，Gateway 保持独立 | Implemented / Evolving | [Poly RFC-2026-0022](https://github.com/botearn/ARTi-poly/blob/main/rfcs/2026/RFC-2026-0022-same-origin-embedding.md) |
| ARTI-D004 | 通知表和类型治理收口到 `arti` | Accepted | [arti RFC-0013](https://github.com/iloveopt/arti/blob/main/docs/rfcs/0013-notification-system.md) |
| ARTI-D005 | `AnswerKind` 作为 Query 类型权威标签 | Accepted | [arti RFC-0003](https://github.com/iloveopt/arti/blob/main/docs/rfcs/0003-canonical-answer-kind.md) |
| ARTI-D006 | 共享 DB migration append-only，函数修改先核对生产真身 | Standard | [项目 Playbook](../playbooks/shared-database-change.md) |
| ARTI-D007 | 共享标识符漂移必须按 Known Drift Review 复核 | Proposed | [Shared Identifier Drift Review](ARTI-D007-shared-identifier-drift-review.md) |

## 索引规则

- 本表只登记影响两个以上仓库或长期项目边界的决策。
- 单仓库实现选择留在对应仓库 RFC。
- 状态变化时更新本索引，但不复制 RFC 正文。
- 被取代的决策保留记录，并链接新决策。

## 当前异常

- `arti` RFC 索引历史上存在两个 `0010`。旧链接继续保留，新 RFC 不再复用编号。
- Backend 和 Poly 的 RFC 状态未完全同步到主站索引。跨仓改动应在合并时同时更新双方状态。
