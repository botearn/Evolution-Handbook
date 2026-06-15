# ARTI Source of Truth

**状态：Current**

**核对日期：2026-06-15**

本文件定义项目级所有权。它不取代代码仓库中的可执行真源。

## 所有权矩阵

| 主题 | 项目级 Owner | 可执行真源 | 主要消费者 |
|---|---|---|---|
| 主站路由与体验 | `arti` | `src/`, `vercel.json` | Web 用户 |
| 原生预测市场 UI | `arti` | `src/predict/` | Web 用户 |
| Prediction Gateway | `ARTi-poly` | `api/`, gateway 配置 | `arti/src/predict` |
| 重型报告运行时 | `ARTI_backend` | `modules/reporting/`, `worker/` | `arti`, CLI |
| 报告结果 DTO | `ARTI_backend` | assembler、types、result contract | `arti`, scripts |
| `report_tasks` schema | `arti` | `supabase/migrations/` | Backend、主站 |
| 通知 schema 与 `notify_user` | `arti` | migrations + notification registry | Backend、Poly、主站 |
| Credits 消费与价格 | `arti` | migrations + `credit_pricing` | Backend、Poly、主站 |
| 预测市场 API 行为 | `ARTi-poly` | serverless handlers | 主站预测 UI |
| CLI 命令与 MCP 工具 | `ARTI-CLI` | `src/` | CLI/MCP 用户 |
| Railway Prompt | `ARTI_backend` | `shared/arti_shared/prompts/` | Worker/API |
| Web `AnswerKind` | `arti` | `src/lib/answer-kind.ts` | DB 写入、前端展示 |
| 通知类型注册表 | `arti` | `src/lib/notification-kind.ts` | 主站通知 UI |
| 股票代码规范化 | 分布式 | Backend resolver + Web normalizer | 全项目 |

## 项目级契约与实现真源

本目录的 `contracts/` 记录：

- 谁拥有契约
- 哪些消费者依赖它
- 不允许破坏的不变量
- 修改时需要联动哪些仓库

字段、枚举和运行行为仍以 Owner 仓库的代码与 migration 为准。

## 共享数据库规则

1. 每个共享表、RPC 和 trigger 只有一个 migration Owner。
2. 其他仓库可以调用，但不得复制旧 DDL 后整体覆盖。
3. 已 merge 或已应用的 migration 只追加，不回改。
4. 修改 `CREATE OR REPLACE FUNCTION` 前必须核对生产当前定义和其他仓库的新版本。
5. 文档中的 SQL 示例不能被当作可直接上线的 migration。

## 当前未完全收口的真源

### Prompt 与 Agent Registry

Backend 与 CLI 均保存 Prompt，主站保存报告配置。不同运行时确实需要独立加载，但语义一致性尚未自动验证。

当前规则：

- Railway 报告行为以 Backend 实际加载的 Prompt 为准。
- CLI Prompt 是 CLI 运行时资产。
- 跨运行时要求一致时，变更必须显式同步并增加对账验证。

### 股票代码规范化

Backend 已有 Python canonical resolver，Web 侧也有 TypeScript 归一逻辑。两者尚未来自同一共享包。

当前规则：

- 存储和跨服务传输使用 canonical symbol。
- 港股使用 5 位代码加 `.HK`。
- A 股使用 6 位代码加 `.SS` 或 `.SZ`。
- 跨语言实现必须通过共享用例对账。
