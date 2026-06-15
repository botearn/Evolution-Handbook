# AI Native Organization

AI Native 不是“团队使用 AI 工具”，而是组织把机器可理解的上下文、可验证的工作流和清晰的责任边界作为基础设施。

## 核心目标

- 让人和 Agent 能基于同一份真实上下文工作
- 把重复判断沉淀为规则、模板、工具和评估
- 让自动化程度随风险变化，而不是一律自动或一律人工
- 保持决策、执行和验证可追踪
- 让组织能力在每次工作后留下可复用资产

## 目录

```text
ai-native/
├── principles/       长期稳定的基本原则
├── operating-model/  组织、人和 Agent 如何协作
├── context-system/   上下文采集、记忆分层和知识晋升
├── tooling/          Agent 宿主与外部系统 CLI 的采用实践
├── workflows/        面向具体职能的工作流
├── agent-system/     指令、上下文、工具、记忆与评估
├── governance/       AI 风险、权限、数据和审计
├── patterns/         可重复采用的结构
├── playbooks/        可直接执行的操作步骤
└── case-studies/     已发生且可复盘的内部案例
```

## 第一批原则

- [端到端产品责任](principles/end-to-end-product-ownership.md)
- [按 Trait 组队](principles/trait-based-teams.md)
- [上下文即基础设施](principles/context-as-infrastructure.md)
- [验证优先](principles/verification-first.md)
- [人类责任不可外包](principles/human-accountability.md)
- [自动化边界与风险匹配](principles/automation-boundaries.md)

## 第一批可执行内容

- [人机协作模型](operating-model/human-agent-collaboration.md)
- [上下文系统](context-system/README.md)
- [AI 工具实践](tooling/README.md)
- [飞书与 OpenClaw 团队协作](workflows/feishu-openclaw-collaboration.md)
- [Agent 指令层级](agent-system/instruction-hierarchy.md)
- [真源与 Bridge 模式](patterns/source-of-truth-and-bridges.md)
- [建立 Agent 工作台](playbooks/create-agent-workspace.md)
- [运行上下文复审](playbooks/run-context-review.md)

## Best Practice 准入

一个做法只有满足以下条件，才应被称为 Best Practice：

1. 解决的问题和适用边界清晰。
2. 至少有一个真实项目采用。
3. 有结果、失败案例或验证证据。
4. 已说明何时不应采用。
5. 有明确维护者或复审机制。

尚未达到以上标准的内容应标记为 `Draft` 或 `Pattern Candidate`。
