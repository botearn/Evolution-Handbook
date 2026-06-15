# ARTI Repository Map

## 活跃仓库

| 仓库 | 主要职责 | 运行环境 | 默认分支 |
|---|---|---|---|
| [`iloveopt/arti`](https://github.com/iloveopt/arti) | 主站、原生预测市场 UI、Supabase Edge Functions、共享业务 DB migrations | Vercel + Supabase | `main` |
| [`botearn/ARTI_backend`](https://github.com/botearn/ARTI_backend) | FastAPI 网关、报告 Worker、数据管道、报告运行时 Prompt | Railway | `main` |
| [`botearn/ARTi-poly`](https://github.com/botearn/ARTi-poly) | 预测市场 API 网关、市场同步和独立部署兼容层 | Vercel + Supabase | `main` |
| [`botearn/ARTI-CLI`](https://github.com/botearn/ARTI-CLI) | CLI、MCP Server 和本地数据访问 | npm / 本地进程 | `master` |

## 所有权摘要

### `arti`

- 拥有用户主体验和主站路由。
- 拥有 `AnswerKind`、通知类型等前端注册表。
- 对已明确收编的共享业务表和 RPC 负责 migration。
- 消费 Railway API、Supabase 和 prediction gateway。

### `ARTI_backend`

- 拥有重型报告的创建、排队、生成和结果组装。
- 拥有 Railway 运行时的 Prompt、报告类型和 Worker 注册表。
- 拥有数据同步与市场数据服务。
- 更新共享 Supabase 中的任务、缓存和报告结果，但不擅自改变共享 schema。

### `ARTi-poly`

- 拥有 prediction gateway 和预测市场服务端接口。
- 消费主站维护的共享 Credits、通知和认证契约。
- 保留独立部署能力，但主用户体验已逐步收编到 `arti/src/predict/`。

### `ARTI-CLI`

- 拥有命令行和 MCP 的用户契约。
- Backend HTTP API 是主要上游，OpenBB 是部分场景的 fallback。
- Prompt 副本是下游资产，不应被默认视作报告生产运行时真源。

## 文档现状

- 各仓库已经形成自己的 RFC 和运行文档。
- `arti` 与 `ARTi-poly` 同时有 `AGENTS.md` 和 `CLAUDE.md`。
- `ARTI_backend` 与 `ARTI-CLI` 仍主要依赖 `CLAUDE.md`，平台无关规则层未完成。
- 各仓库 RFC 编号空间独立，跨仓库改动需要主篇和姊妹篇互引。

## 依赖关系

```text
arti
├── ARTI_backend API / report_tasks / market data
├── ARTi-poly prediction gateway
└── shared Supabase business plane

ARTI_backend
├── shared Supabase business plane
├── external market data providers
└── model providers

ARTi-poly
├── shared Supabase business plane
└── external prediction-market providers

ARTI-CLI
├── ARTI_backend HTTP API
└── OpenBB fallback
```

## 过渡区

- `arti/src/predict/` 已包含预测市场前端；`ARTi-poly` 仍保留完整应用与 API。修改前必须判断目标是主站原生 UI、独立兼容部署还是 gateway。
- Edge Functions 到 Railway 的迁移尚未完全结束。不能仅凭功能名称猜测真实生产入口。
- Prompt 在 Backend 和 CLI 中均有副本，且主站另有报告配置。跨运行时一致性尚未形成单一自动化真源。
