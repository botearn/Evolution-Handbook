# Workspace Routing

本文件是 Evolution Handbook 的机器可读路由表。查找或新增内容前，先从这里判断归属。

## 核心路由

| 想找或新增的内容 | 位置 |
|---|---|
| 参与贡献、提交 PR 或提出知识候选 | `CONTRIBUTING.md` |
| 组织实践和文档治理 | `practices/` |
| 跨项目通用工程实践 | `practices/` |
| AI Native 原则、模式和工作流 | `ai-native/` |
| 上下文、记忆和知识晋升机制 | `ai-native/context-system/` |
| Codex、Claude Code、OpenClaw、Feishu CLI 等工具实践 | `ai-native/tooling/` |
| 飞书、OpenClaw 与专业 Agent 的协作流程 | `ai-native/workflows/feishu-openclaw-collaboration.md` |
| 某个项目的架构与跨仓契约 | `projects/<project>/` |
| 可复制模板 | `templates/` |

## 内容类型路由

| 内容类型 | 位置 | 判断标准 |
|---|---|---|
| Principle | `ai-native/principles/` 或 `practices/` | 长期稳定地回答“为什么” |
| Pattern | `ai-native/patterns/` | 回答“何时采用什么结构” |
| Playbook | 对应 `playbooks/` | 回答“如何执行和验证” |
| Contract | `projects/<project>/contracts/` | 两个以上仓库共同遵守 |
| Decision | `projects/<project>/decisions/` | 长期项目边界与选择 |
| Case Study | `ai-native/case-studies/` | 有真实结果、限制和证据 |
| Implementation Detail | 对应代码仓库 | 与代码路径、命令或部署绑定 |

## 不放在本仓库

Evolution Handbook 是公共组织手册。以下内容应进入私有 Context Workspace 或原始系统：

- 用户画像、个人偏好和沟通隐私
- 每日工作流水和未经筛选的观察
- 私密会议记录、客户信息和内部经营数据
- Token、密钥、账号、本机路径和生产访问方式
- 尚未脱敏的事故证据

公共 Handbook 只接收经过审计、脱敏和晋升的长期知识。

## 查找顺序

1. 先看本文件确定层级。
2. 查看目标目录的 `README.md` 或索引。
3. 查看 `SOURCE_OF_TRUTH.md` 确认 Owner。
4. 最后再做全仓搜索。

发现新目录或归属发生变化时，同步更新本文件。
