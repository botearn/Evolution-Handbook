# Claude Auth: Account vs Token

**状态：Draft**

区分两件事：

- **Claude 账号 / OAuth profile**：适合人类本地开发和临时操作。
- **API token / service credential**：适合程序、CI、服务器和无人值守任务。

## 选择规则

| 场景 | 用什么 | 原因 |
|---|---|---|
| Claude Code 日常交互 | Claude 账号登录 | 人在场，权限和审批跟个人身份走 |
| 本地 `ant` CLI 调试 | Claude 账号 / OAuth profile | 不需要长期保存静态 key |
| 本地脚本短期测试 | 优先账号；必要时用临时 token | 降低 key 泄露风险 |
| CI / 定时任务 / 服务器 | API token 或工作负载身份 | 非交互、可轮换、可审计 |
| 多 workspace 切换 | Named profile | 避免用错 workspace |
| 生产 Agent 访问第三方系统 | Vault / 密钥管理系统 | 不把 secret 放进 prompt、代码或公共文档 |

## 不要混用

同一进程里不要同时设置：

- `ANTHROPIC_API_KEY`
- `ANTHROPIC_AUTH_TOKEN`

如果两者都存在，容易打到错误身份或直接认证失败。

## 常见坑

- 环境里的 `ANTHROPIC_API_KEY` 会覆盖账号 profile。
- 空字符串也可能被当作“已设置”。要真正 unset。
- OAuth token 用 `Authorization: Bearer ...`，不是 `x-api-key`。
- API key 不写进 `CLAUDE.md`、README、Prompt、Memory 或 issue。
- 飞书、GitHub、Linear 等第三方 token 也不进 Handbook。

## 推荐做法

### 本地人类操作

用账号登录，并用 profile 区分 workspace：

```bash
ant auth login --profile dev
ant profile activate dev
ant auth status
```

如果要确认 profile 没被 API key 覆盖：

```bash
env -u ANTHROPIC_API_KEY ant auth status
```

### CI / 服务器

使用专门的 API token 或工作负载身份：

- 最小权限
- 单独 secret store
- 定期轮换
- 不复用个人账号 token
- 日志中不打印 secret

### Agent 工具访问外部系统

优先放进 Vault 或宿主侧 secret manager。Agent 只看到工具，不直接看到 token。

如果必须由宿主执行带密钥操作，把它做成 custom tool：Agent 发请求，宿主用自己的凭据执行，再把结果返回。

## 判断句

- 人在终端前操作：优先 Claude 账号。
- 程序无人值守运行：用 token / 工作负载身份。
- secret 会被 Agent 看到：方案不对，换 Vault、MCP credential 或宿主侧工具。
