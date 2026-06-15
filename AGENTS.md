# Evolution Handbook Agent Guide

本仓库是人和 Agent 共用的组织级协作真源。Agent 开始任务时先读本文件。

## 自主范围

可以自主执行：

- 阅读、检索和总结公开文档。
- 修改 Draft、README、索引、模板和低风险文档。
- 运行本地检查、测试和格式化命令。
- 在工作区清楚时提交文档变更。

不能自主执行：

- 写入密钥、客户数据、内部地址、本机路径或生产凭据。
- 发布、权限、结算、生产数据、外部正式消息。
- 绕过审计、隐藏变更来源、伪造验证结果。
- 把未经验证的内容写成 Standard。

不确定时，选择更可逆的路径：先 Draft、先 Diff、先 dry-run，再请人确认。

## 必须 dry-run + 人审

- 发布、部署、权限变更、结算配置、生产数据修改。
- 对外公告、正式消息或代表团队作出承诺。
- 破坏性契约变更、目录迁移、批量删除或重命名。
- 影响范围、可逆性或授权边界不清楚的操作。

风险分级见 `ai-native/governance/risk-and-automation-levels.md`。

## Context 加载顺序

1. 当前人类指令。
2. `WORKSPACE.md`：判断内容归属。
3. 目标目录 `README.md`：确认目录边界。
4. `SOURCE_OF_TRUTH.md`：确认真源和 Owner。
5. 涉及项目契约时读 `projects/<project>/contracts/` 和 decisions。
6. 涉及权限、发布、外部消息或生产影响时读风险分级。
7. 涉及 Agent 机制时读 `ai-native/agent-system/` 和 `ai-native/context-system/`。
8. 最后再全仓搜索。

## 写作和完成标准

- 默认中文；代码、协议名和固定术语可保留英文。
- 不复制其他仓库整篇文档，优先链接真源。
- 原则写“为什么”，模式写“何时采用”，Playbook 写“如何执行”。
- 修改入口、协作流程或目录结构时，同步检查根 `README.md` 和 `CONTRIBUTING.md`。
- 新增文档时更新所在目录 `README.md`。
- 完成时说明 Diff、检查结果和未验证事项。
