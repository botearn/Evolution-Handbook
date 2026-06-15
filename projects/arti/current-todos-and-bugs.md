# ARTI Current Todos and Bugs

**状态：Current**

**核对日期：2026-06-15**

本页是四个 ARTI 仓库的阶段性工程快照，不替代各仓库 issue、RFC、代码和生产监控。

核对范围：

- `arti`
- `ARTI_backend`
- `ARTi-poly`
- `ARTI-CLI`

## 一页结论

当前最需要处理的不是继续增加功能，而是先恢复关键路径的确定性：

1. Backend 会接受未识别 symbol，并把未知输入默认当作美股继续生成报告。
2. `arti` 主分支的 lint 和测试不是绿色，生产依赖也存在可修复的高危漏洞。
3. Prediction Gateway 和 Prompt 都有跨仓副本漂移，且已经产生真实行为差异。
4. Backend 队列已有监控和部分自愈，但仍存在只在启动时恢复、终态无 CAS 守卫等生命周期缺口。
5. `arti` 中有一组未提交的预测市场迁移、Cron 和 Edge Function，属于进行中工作，发布前需要独立审查。

## P0：先恢复发布可信度

| 项目 | 类型 | 证据 | 建议完成条件 |
|---|---|---|---|
| Backend 未识别 symbol 仍可建任务 | Confirmed bug | `report_handler.py` 使用 `normalize_symbol(raw_symbol) or raw_symbol`；数据层 `_detect_market()` 对未知输入返回 `US` | 未识别输入返回 4xx、不建任务；A/HK/US 和非法输入用例进入 CI |
| `arti` lint 失败 | Release blocker | `npm run lint`：92 errors、230 warnings | error 清零；新增代码不扩大 warning 基线 |
| `arti` 测试无法全绿 | Release blocker | 40 个 suite 中 3 个在模块加载阶段失败；503 个断言通过 | 修复或 polyfill 测试环境的 `localStorage`；在团队支持的 Node 版本矩阵复跑 |
| `arti` 生产依赖高危告警 | Security debt | `npm audit --omit=dev`：4 high、1 moderate，涉及 React Router、Lodash、WebSocket 依赖 | 升级锁文件并完成登录、跳转、路由和实时连接回归 |
| 预测市场进行中迁移未形成可审查交付 | Release blocker | `arti` 有未提交的 migration、两个 Cron workflow、两个 Edge Function 和 `config.toml` 修改 | 明确 Owner；迁移 dry run；鉴权、幂等、失败告警和回滚检查通过后再发布 |

## P1：已确认的产品与运行时问题

| 仓库 | 问题 | 当前影响 | 建议 |
|---|---|---|---|
| `ARTI_backend` | A 股数据源不可用时静默 fallback 到 yfinance | 可能把“数据源故障”包装成空数据或错误市场数据 | 显式失败或返回 source error marker，不得跨市场静默降级 |
| `ARTI_backend` | 3 类队列恢复只在 worker 启动时运行 | 健康且长期不重启的 worker 无法及时恢复部分僵尸任务 | 把 stale processing、orphan pending、legacy defer failed 纳入周期扫描 |
| `ARTI_backend` | `done` / `failed` 终态更新没有状态守卫 | 迟到 worker 可能覆盖已恢复并重新处理的任务 | 使用 `WHERE status='processing'` CAS，并测试迟到写入 |
| `ARTi-poly` | AI 分析页下注上限只按 `balance` 计算 | 有 `consumable` 但 `balance` 低的新用户会被前端错误拦截 | 与主站实现对齐，统一使用 `balance + consumable` |
| `ARTi-poly` | 测试文件导入了不存在的相对路径 | `npm test` 失败：68 个断言通过，但 1 个 suite 无法加载 | 改为正确 handler 路径，并把该测试纳入稳定门禁 |
| `ARTI-CLI` | Prompt 副本明显落后于 Backend | 分析师和合成器行为可能与生产报告不一致；CLI 缺第 8 位大师 | Backend 作为语义真源，提供同步脚本和 checksum/diff CI |
| `ARTI-CLI` | 生产依赖存在高危告警 | `npm audit --omit=dev`：1 high、4 moderate | 升级 MCP/HTTP 依赖树，重点回归 URI、鉴权和限流 |
| `arti` | 订阅页约 15 秒 loading、文档记录 RLS 403 重试 | 用户感知明显，但本次仅从 RFC 找到记录，未复现生产请求 | 单独复现并保存 network trace；确认 RLS、项目配置和 Query retry 行为 |

## P1：跨仓漂移

### Prediction Gateway

`ARTi-poly/api/_lib` 与 `ARTI_backend/apps/prediction-market-api/api/_lib` 的 12 个同名核心模块中，8 个内容不同。

当前判断：

- `ARTi-poly` 仍被项目文档定义为 Prediction Gateway 真源。
- Backend 中同时存在可部署的 gateway 副本。
- 两份实现没有自动同步门禁。
- `ARTi-poly` 有较完整的 gateway 单测，Backend 副本没有同等测试资产。

建议只保留一个可编辑真源。另一个仓库通过发布产物、subtree、生成步骤或校验脚本消费，禁止继续手工复制。

### Report Prompts

Backend 与 CLI 的 Prompt 对账结果：

- `_common.yaml` 不同。
- 全部 Layer 1 角色文件不同。
- 两个 synthesizer 文件不同。
- CLI 缺少 `innovation_evangelist.yaml`。
- CLI 的同步完成文档仍描述 7 位大师。

Prompt 可以因运行时不同而有受控差异，但差异必须有 allowlist 和原因，不能靠人工记忆。

## P2：工程债与文档债

| 仓库 | 项目 | 说明 |
|---|---|---|
| `ARTI_backend` | 毒丸 job 无完整终态 | report task 达复活上限后，队列 job 仍可能反复空转 |
| `ARTI_backend` | 早晚报缺期次对账 | Cron 根本未启动时可能没有业务记录，只依赖平台告警 |
| `arti` | Admin feedback 查询全历史后内存去重 | 数据量增长后会形成性能问题 |
| `arti` | Prompt、report config 和 Edge/Railway 路径继续并存 | 需要给每条运行路径标明 Owner、流量和退出条件 |
| `ARTI-CLI` | README 与 package metadata 过期 | 版本 badge 为 `0.2.0-beta`，包版本为 `0.3.4`；仓库 URL 仍指向旧 Owner；README 含本机绝对路径 |
| `ARTI-CLI` | 6 个研报 UX 验收测试为空实现 | Python 文件只有 TODO 和 `pass`，且不在 `npm test` 门禁内 |
| 全项目 | Agent 指令不一致 | Backend、CLI 缺平台无关 `AGENTS.md`；现有规则存在重复和命名漂移 |

## 已核实为旧状态

以下内容不应继续直接当作当前开放 bug：

- Backend 的队列深度飞书告警已经在 worker 周期监控中实现。
- `report_config` lockdown migration 已包含删除宽松写策略和审计表；文件头的 “P0 TODO” 是背景文字。
- CLI browser login 使用 `device_code`，与主站和 `cli-auth` Edge Function 一致；当前失败的是仍断言 `code` 的旧测试。
- 主站 `arti` 的 `AIAnalysisRunner` 已按 `balance + consumable` 计算；错误仍存在于独立 `ARTi-poly` 副本。
- `ARTi-poly` RFC-0020 中 account、BetPanel 和 QuickBetPanel 的 `consumable` 工作已落地，未勾选 checklist 已过期。

## 验证记录

| 仓库 | 命令 | 结果 |
|---|---|---|
| `arti` | `npm run lint` | 失败：92 errors、230 warnings |
| `arti` | `npm run test -- --run` | 失败：37 suite 通过、3 suite 失败；503 tests 通过 |
| `ARTi-poly` | `npm run build` | 通过 |
| `ARTi-poly` | `npm test` | 失败：11 suite 通过、1 suite 导入失败；68 tests 通过 |
| `ARTI-CLI` | `npm run build` | 通过 |
| `ARTI-CLI` | `npm test` | 失败：14 suite 通过、1 test 失败；48 tests 通过 |
| `ARTI_backend` | 队列和 worker pytest | 未运行：本机仓库没有已安装的 pytest 环境 |

测试环境为 Node `v26.3.0`。`arti` 的 `localStorage` 失败需要在团队正式支持的 Node LTS 环境复核，避免把单一运行时差异误判为生产回归。

## 建议执行顺序

1. 修 Backend symbol fail-open，并补非法输入和跨市场测试。
2. 恢复 `arti` lint/test 绿色，处理可直接升级的高危依赖。
3. 审查并拆分 `arti` 当前预测市场 WIP，迁移、Cron、Edge Function 分别验收。
4. 确定 Prediction Gateway 单一真源，先用 checksum CI 阻止继续漂移。
5. 以 Backend 为 Prompt 语义真源，同步 CLI 并为允许差异建立清单。
6. 修队列周期自愈和终态 CAS。
7. 修复仍需保留的 `ARTi-poly` 独立入口；若计划退役，则明确截止日期和只读范围。
8. 复现订阅页 RLS 403，再决定修 RLS、环境配置还是查询策略。
