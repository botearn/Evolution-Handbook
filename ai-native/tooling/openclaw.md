# OpenClaw Practices

**状态：Draft**

**最后核对：2026-06-15**

本指南面向官方 [`openclaw/openclaw`](https://github.com/openclaw/openclaw)，重点说明其作为飞书常驻协作 Agent 的组织级采用方式。

OpenClaw 的定位不是组织知识真源，也不是无边界的自动执行者。它是连接团队消息、Agent Session、Skill 和受控工具的常驻 Gateway。

官方 Feishu Channel 要求 OpenClaw `2026.5.29` 或更高版本。团队实例升级前应在测试环境核对 Channel、Session、Skill 和权限行为。

## 推荐定位

```text
飞书
  人类提出任务、补充上下文、批准高风险动作
    ↓
OpenClaw
  接收、澄清、路由、跟踪、定时和汇报
    ↓
专业 Agent / 受控工具
  Codex、Claude Code、Feishu CLI、项目 Skill
    ↓
可审查交付物
  PR、Issue、文档草稿、任务记录、验证证据
```

### OpenClaw 适合负责

- 在飞书中提供统一的任务入口
- 收集目标、上下文、约束和完成条件
- 将请求路由到隔离的 Agent 或 Session
- 运行已批准的稳定 Skill 和定时任务
- 汇总进度、阻塞、结果和待确认事项
- 将候选经验转成 Issue、Draft PR 或 Observation

### OpenClaw 不应默认负责

- 单独批准发布、结算、权限和生产数据修改
- 把群聊内容自动晋升为组织规则
- 以一个共享 Session 服务多个需要隐私隔离的成员
- 在不受控的 Host 环境执行任意 Shell
- 将飞书聊天记录作为项目或组织的长期真源

## Feishu Channel 配置原则

### 1. 群聊默认 Allowlist

- `groupPolicy` 保持 `allowlist`
- 群聊默认要求 `@mention`
- 只允许明确登记的群和成员触发 Agent
- 不因“内部群”而关闭所有发送者限制

OpenClaw 官方 Feishu Channel 默认要求群聊 Allowlist 和 @mention，这适合作为团队基线。

### 2. 私聊必须隔离

多人可以私聊同一个 Bot 时，使用按 Channel 和 Sender 隔离的 Session。否则不同成员可能共享对话上下文。

动态 Agent 可以为每个成员创建独立 Workspace、Memory 和会话，但这是消息上下文隔离，不是敌对租户级安全边界。

### 3. 按职责路由 Agent

不要让一个 Agent 同时拥有所有知识和工具。推荐至少区分：

| Agent | 主要职责 | 默认权限 |
|---|---|---|
| `team-coordinator` | 澄清、路由、汇报、知识候选 | 飞书读写，有限 Session 工具 |
| `engineering` | 代码任务和 PR 交付 | 指定仓库 Workspace，受控 Shell |
| `knowledge` | Handbook 草稿和索引维护 | Handbook 只读或分支写入 |
| `operations` | 定时检查和状态汇总 | 只读 API，写操作单独批准 |

实际 Agent ID、群 ID、成员 ID、Workspace 路径和凭证属于私有运行配置，不进入公共 Handbook。

### 4. 非 Owner 会话默认 Sandbox

团队群和共享入口应：

- 使用 Agent 或 Session 级 Sandbox
- 默认不给 Host Home Directory
- Workspace 默认只读或无访问
- 禁止 `gateway`、`cron`、浏览器和高风险 Shell，除非该 Agent 明确需要
- 限制可以 Spawn 的 Subagent
- Elevated 权限仅向受控身份开放

### 5. 第三方 Skill 按代码审查

Skill 可以执行代码和调用凭证。安装前：

1. 阅读 `SKILL.md`、脚本和依赖。
2. 确认触发条件不会误匹配。
3. 在测试 Workspace 和 Sandbox 中运行。
4. 明确它能访问的数据和 Tool。
5. 记录版本、来源、Owner 和卸载方式。

未经审查的 ClawHub 或第三方 Skill 不进入团队实例。

## 与 Codex / Claude Code 的协作

OpenClaw 负责入口和协调，代码 Agent 负责仓库执行。

### 推荐交接包

路由代码任务前，OpenClaw 应整理：

- `Goal`
- `Repository / Workspace`
- `Context`
- `Constraints`
- `Done when`
- `Risk level`
- `Human approver`
- `Return channel / thread`

Codex 可通过 OpenClaw 的 ACP Session 绑定到飞书私聊或 Topic Thread。若未启用 ACP，也可以由 OpenClaw 创建结构化任务，再交给独立 Codex 或 Claude Code 会话。

代码 Agent 返回：

- 修改摘要
- PR、Commit 或 Diff 链接
- 实际运行的验证
- 未验证事项和剩余风险
- 需要人类决定的问题

OpenClaw 不把“Agent 声称完成”视为完成，必须检查交付物和验证证据。

## 与 Feishu CLI 的关系

- OpenClaw：对话入口、Session、路由和长期运行
- Feishu CLI：对飞书资源进行结构化、可 Dry Run 的确定性操作

OpenClaw 需要创建文档、日程、任务或消息时，优先通过受控 Skill 调用 Feishu CLI，而不是把复杂 API 调用直接写进 Prompt。

写操作仍遵循：

```text
读取 -> Schema -> Dry Run -> 确认 -> 执行 -> 回读
```

## 运行与审计

团队实例至少保留：

- Gateway 和 Channel 健康状态
- Agent、Session 和 Binding 变更记录
- Skill 安装与升级记录
- 高风险 Tool 的批准记录
- 定时任务的 Owner、频率和停止方式
- 失败任务的日志位置和升级路径

日志不得成为泄露聊天内容、Token 或私密文档的旁路。

## 采用清单

- [ ] 飞书群和成员采用 Allowlist
- [ ] 群聊默认要求 @mention
- [ ] 多人私聊使用 Session 隔离
- [ ] 不同职责路由到不同 Agent
- [ ] 团队入口默认启用 Sandbox 和最小 Tool
- [ ] 第三方 Skill 已审查和试运行
- [ ] 高风险动作需要人类批准
- [ ] 代码任务返回可审查交付物和验证
- [ ] OpenClaw Memory 不替代 Git 或业务系统真源
- [ ] 运行配置和凭证未进入公共 Handbook

## 官方参考

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Feishu Channel](https://docs.openclaw.ai/channels/feishu)
- [Session management](https://docs.openclaw.ai/concepts/session)
- [Skills](https://docs.openclaw.ai/tools/skills)
- [Security](https://docs.openclaw.ai/gateway/security)
- [Configuration](https://docs.openclaw.ai/gateway/configuration)
