# AI Native Workflows

Workflow 描述某一职能如何在人、Agent 和外部系统之间流转，强调输入、状态、交接和结果。

## 当前内容

- [飞书与 OpenClaw 团队协作](feishu-openclaw-collaboration.md) - `Draft`

现有可执行步骤主要位于：

- 通用 Agent 操作：`ai-native/playbooks/`
- ARTI 跨仓库操作：`projects/arti/playbooks/`
- 工具专属操作：`ai-native/tooling/`

## Workflow 准入条件

一项 Workflow 进入本目录前，应：

- 跨越两个以上角色、Agent 或系统
- 明确输入、输出、状态和责任交接
- 区分人工判断与可自动化步骤
- 定义失败、重试和升级路径
- 已在真实工作中完成至少一次端到端验证

单次操作步骤写成 Playbook；只描述系统结构的内容写成 Pattern。

## 候选方向

- 从需求澄清到代码合并
- 从会议记录到任务和知识晋升
- 从线上信号到事故响应和复盘
- 从项目 Observation 到组织 Best Practice
