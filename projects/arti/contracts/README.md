# ARTI Cross-Repository Contracts

这里记录两个以上 ARTI 仓库共同依赖的稳定不变量。

## 契约目录

| 契约 | Owner | 消费者 |
|---|---|---|
| [报告任务生命周期](report-tasks.md) | `arti` schema + `ARTI_backend` runtime | 主站、Backend |
| [报告结果](report-result.md) | `ARTI_backend` | 主站、脚本、CLI |
| [Credits 与结算](credits-and-settlement.md) | `arti` shared DB | Backend、Poly、主站 |
| [通知](notifications.md) | `arti` | Backend、Poly、主站 |
| [共享标识符](shared-identifiers.md) | 分主题 Owner | 全项目 |

## 契约文档职责

每份文档只回答：

- 谁是 Owner
- 哪些不变量必须保持
- 生产者和消费者分别承担什么责任
- 如何安全修改
- 去哪里查看字段级真源

它们不复制完整 Schema、Prompt 或 API 文档。

## 变更规则

- 兼容性变更可以由 Owner 实施，但必须更新契约和消费者测试。
- 破坏性变更需要项目级决策记录和各仓库实施 RFC。
- 共享字符串值必须完全一致，不允许各仓库自行翻译或改名。
- 任何临时双写、双读或 fallback 都要写明退出条件。
