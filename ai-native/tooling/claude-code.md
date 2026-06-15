# Claude Code Practices

**状态：Draft**

**最后核对：2026-06-15**

本指南记录 Claude Code 的宿主差异。跨宿主长期规则仍以项目 `AGENTS.md` 和项目 Skill 真源为主。

## 推荐实践

### 1. 先给 Agent 一个可执行的验证信号

测试、构建退出码、Lint、Fixture Diff 或 UI 截图都可以构成验证信号。Prompt 应要求 Claude Code 运行检查、读取结果并迭代，而不是只生成代码。

### 2. 大任务采用 Explore、Plan、Implement、Verify

规划适合不熟悉的代码、跨文件改动和方案不确定的任务。小而明确的修改可以直接执行。

如果需求仍然模糊，先让 Claude Code 访谈需求并形成自包含 Spec，再用干净会话执行。

### 3. 保持 `CLAUDE.md` 简短

`CLAUDE.md` 只保存每次会话都需要、且无法从代码直接推断的内容，例如：

- 特殊构建和测试命令
- 与默认不同的代码约定
- 仓库礼仪和关键架构决策
- 环境陷阱和明确禁止事项

项目采用多宿主时，推荐：

```md
# CLAUDE.md

Read @AGENTS.md first.
Use the project skills referenced there for task-specific workflows.
```

宿主专属差异可以继续写在 `CLAUDE.md`，不要复制 `AGENTS.md` 全文。个人项目备注进入 `CLAUDE.local.md` 并加入 `.gitignore`。

### 4. 按职责选择扩展机制

| 需求 | 机制 |
|---|---|
| 每次会话都需要的规则 | `CLAUDE.md` |
| 按需加载的领域知识和工作流 | Skill |
| 隔离研究或专项审查 | Subagent |
| 必须执行、不能靠模型记住的动作 | Hook |
| 外部系统实时数据和操作 | MCP 或专用 CLI |
| 可安装的一组能力 | Plugin |

### 5. 主动管理上下文

- 不相关任务使用新会话或 `/clear`
- 长任务在 Compact 时保留修改文件、关键决策和验证命令
- 大规模代码探索交给 Subagent，主上下文只接收结论
- 同一问题反复纠偏后，整理已知条件并从干净上下文重试

上下文越长不代表信息越充分。只保留当前决策需要的信息。

### 6. 权限与自动化分级

常用且低风险的命令可以精确 Allowlist；文件系统和网络访问由 Sandbox 限制。对删除、发布、迁移、授权和外部写操作保留人工确认。

Hook 适合零例外规则，例如编辑后执行 Lint 或禁止修改受保护目录。建议先在 Prompt 中验证流程稳定，再升级为 Hook。

### 7. 使用独立上下文审查

实现与审查分开：

- Writer 会话负责实现和自测
- Reviewer 会话基于 Diff、需求和测试证据寻找反例

并行修改应使用独立 Git Worktree，避免多个会话写入同一工作区。

### 8. 自动化输出必须可解析

在 CI 或脚本中使用非交互模式时，选择 JSON 或流式 JSON，并明确超时、退出码和允许的工具。自动化任务不应依赖自然语言中的模糊“成功”。

## 不推荐

- 把教程、API 全文和文件清单塞入 `CLAUDE.md`
- 在无验证信号时让 Agent 长时间无人值守
- 用同一会话完成实现、论证和最终审查
- 为减少确认而直接放开所有 Bash 或外部写权限
- 在 `CLAUDE.md` 和 `AGENTS.md` 长期维护两份相同规则

## 采用清单

- [ ] `CLAUDE.md` 是短入口而非知识仓库
- [ ] 项目公共规则指向 `AGENTS.md`
- [ ] 重复工作使用 Skill，强制动作使用 Hook
- [ ] 大型探索不会污染主要实现上下文
- [ ] 并行会话使用隔离 Worktree
- [ ] 自动化输出和完成条件可机器解析

## 官方参考

- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices)
- [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)
