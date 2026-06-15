# Agent System

Agent System 记录组成组织级 Agent 工作台的长期结构，包括指令、Skill、工具、权限、记忆与评估。

## 当前内容

- [Agent 指令层级](instruction-hierarchy.md)
- [Useful Skills](skills/README.md)

## 内容边界

本目录负责跨项目成立的系统结构。具体工具命令进入 `tooling/`，项目采用方式进入 `projects/<project>/ai-native.md`，单仓库配置留在代码仓库。

## 待补内容

- Skill 的创建、测试、版本和弃用
- MCP 与 CLI 的选择标准
- Hook、Rules 与 CI 的职责边界
- Agent 任务评估和回归测试
- 多 Agent 委派、隔离和结果合并

新增内容应说明其所在层级、真源位置和可验证行为。
