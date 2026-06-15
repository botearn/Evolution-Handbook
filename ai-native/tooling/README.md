# AI Tooling Practices

**状态：Draft**

本目录记录具体 Agent 宿主和外部系统 CLI 的采用方式。它回答“这个工具如何配置和使用”，但不替代组织级原则。

## 当前指南

| 工具 | 主要角色 | 指南 |
|---|---|---|
| Codex | 软件工程 Agent 与可扩展工作台 | [Codex Practices](codex.md) |
| Claude Code | 终端型软件工程 Agent | [Claude Code Practices](claude-code.md) |
| OpenClaw | 飞书中的常驻协作 Agent 与任务路由层 | [OpenClaw Practices](openclaw.md) |
| Feishu CLI | Agent 访问飞书协作系统的结构化接口 | [Feishu CLI Practices](feishu-cli.md) |

## 跨工具共同做法

1. 用目标、上下文、约束和完成条件定义任务。
2. 复杂任务先探索和计划，小改动直接执行。
3. 持久指令保持短小，只写工具无法从代码推断的内容。
4. 重复工作进入 Skill，强制动作进入 Hook 或 CI。
5. 外部系统采用最小权限、结构化输出和显式身份。
6. 写操作遵循“读取、预演、确认、执行、回读”。
7. Agent 必须展示验证证据，不能只声明完成。
8. 实现者和审查者尽量使用独立上下文。

## 内容晋升

工具指南可能随产品版本变化，因此默认是 `Draft`。当某项做法：

- 在两个以上工具中成立；
- 已被至少一个真实项目验证；
- 不依赖特定命令或产品界面；

应将其晋升到 `principles/`、`patterns/` 或 `playbooks/`，工具页只保留对应入口和差异。

## 维护规则

- 优先引用官方文档，不复制大段产品说明。
- 标明最后核对日期。
- 不在示例中放入真实 Token、租户 ID、用户 ID 或本机路径。
- 产品行为变化后，先修工具页，再评估是否影响通用实践。
