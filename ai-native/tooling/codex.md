# Codex Practices

**状态：Draft**

**最后核对：2026-06-15**

本指南适用于 Codex CLI、IDE Extension 和 Codex App。具体能力以 OpenAI 官方文档为准。

## 推荐实践

### 1. 用四个字段定义任务

一个可执行任务至少说明：

- `Goal`：要改变什么
- `Context`：相关文件、错误、文档和示例
- `Constraints`：架构、安全和范围限制
- `Done when`：测试、行为或交付物达到什么条件

完成条件应尽量由命令、测试、截图或可检查文件验证。

### 2. 只为复杂任务先计划

跨模块修改、模糊需求和高风险迁移先使用 Plan mode。范围清楚的小修改直接执行，避免让流程成本大于任务本身。

### 3. 用 `AGENTS.md` 保存仓库规则

`AGENTS.md` 应包含：

- 仓库结构和关键目录
- 构建、测试、Lint 和格式化命令
- 本项目特有的工程约束
- 禁止事项、权限边界和完成标准

根目录保存共享规则，子目录只添加局部差异。离当前工作目录更近的规则更具体，不应在多个层级复制同一正文。

当同一错误重复出现时，先做复盘，再决定是否更新 `AGENTS.md`。不要把一次性偏好永久写入仓库规则。

### 4. 分离个人配置与项目配置

- `~/.codex/config.toml`：个人默认值和跨项目工具
- `.codex/config.toml`：可信仓库的项目配置
- 命令行参数：一次性覆盖

项目配置不应包含个人凭证。模型、推理强度、Sandbox、Approval、MCP 和 Hook 应按作用域放置。

### 5. 用 Skill 承载可复用工作流

满足以下条件时再创建 Skill：

- 有明确触发场景和输出
- 已重复执行，步骤相对稳定
- 需要引用模板、脚本或领域资料

Skill 应聚焦一个任务，描述中写清适用和不适用边界。优先使用指令；只有需要确定性或外部工具时才增加脚本。

### 6. 用 MCP 连接实时外部系统

需要访问文档、Issue、设计稿、监控或数据库时，优先使用经过授权的 MCP，而不是把旧数据复制进 Prompt。

配置时：

- 只启用任务需要的 Server 和 Tool
- Token 通过环境变量或 OAuth 注入
- 高风险 Tool 保持 `prompt` 审批
- 为启动和调用设置合理超时
- 将跨 Tool 的限制写进 MCP Server instructions

### 7. 用 Hook 和 Rules 执行确定性约束

适合 Hook 或 Rules 的内容包括：

- 密钥扫描
- 修改后的格式化或测试
- 禁止危险命令
- Stop 前的验证门禁

Hook 是代码，应审查来源和变更。不要用 Hook 代替所有判断，也不要为方便配置过宽的命令前缀。

### 8. 把验证和审查放进完成条件

Codex 完成修改后至少应：

1. 运行与改动相关的测试或检查。
2. 阅读结果并修复失败。
3. 检查 Diff 是否有回归和越界修改。
4. 汇报实际证据以及未能执行的检查。

高风险改动使用独立线程或新上下文做第二次 Review，避免实现者自我确认。

## 不推荐

- 用一个超长 `AGENTS.md` 装下全部知识
- 将可从代码推断的信息重复写入指令
- 默认授予整个文件系统或网络访问
- 把一次成功的 Prompt 直接升级为组织标准
- 未运行验证就让 Agent 自行判断任务完成
- 在多个宿主中复制并长期维护同一 Skill 正文

## 采用清单

- [ ] 根目录存在短而准确的 `AGENTS.md`
- [ ] 关键命令可由 Agent 直接执行
- [ ] 完成条件包含机器可读的验证
- [ ] 项目配置不含凭证
- [ ] MCP 和命令权限遵循最小授权
- [ ] 重复工作已评估是否应进入 Skill
- [ ] 强制规则已评估是否应进入 Hook、Rules 或 CI

## 官方参考

- [Codex best practices](https://developers.openai.com/codex/learn/best-practices)
- [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- [Agent Skills](https://developers.openai.com/codex/skills)
- [Model Context Protocol](https://developers.openai.com/codex/mcp)
- [Hooks](https://developers.openai.com/codex/hooks)
