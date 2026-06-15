# Source of Truth

本文件定义 Evolution Handbook 与各项目仓库之间的文档所有权。

## 层级模型

```text
组织级 Handbook
  ↓ 组织原则、共同实践、AI Native 方法
项目级手册
  ↓ 项目边界、跨仓库契约、项目决策
仓库本地文档
  ↓ 代码约束、运行方式、实现细节
代码与可执行资产
```

## 所有权表

| 内容 | 真源位置 | 说明 |
|---|---|---|
| 组织实践和文档治理 | `practices/` | 对所有项目有效 |
| 仓库登记和仓库规则 | `registry/` | 仓库目录、状态和维护规则 |
| 通用工程实践 | `practices/` | 不绑定具体技术栈 |
| AI Native 方法 | `ai-native/` | 人机协作、Agent、治理与评估 |
| 上下文生命周期 | `ai-native/context-system/` | 定义采集、观察、反思和晋升机制 |
| Agent 工具采用指南 | `ai-native/tooling/` | 记录宿主或 CLI 的能力、配置入口与安全边界 |
| 项目边界 | `projects/<project>/` | 定义项目包含哪些仓库和服务 |
| 跨仓库契约 | `projects/<project>/contracts/` | 两个以上仓库共同遵守 |
| 单仓库架构 | 对应 repo 的 `docs/` | 与实现一起演进 |
| Agent 本地指令 | 对应 repo 的 `AGENTS.md` | 必须贴近代码，可直接执行 |
| 构建与部署命令 | 对应 repo | Handbook 只描述通用流程 |
| API schema / migration | 对应 repo | 代码资产优先于说明文档 |
| 项目和仓库目录 | `registry/` | 结构化组织登记 |
| 原始观察与私密记忆 | 私有 Context Workspace | 不进入公共 Handbook |

## 引用规则

1. Handbook 引用仓库实现时，链接到仓库真源，不复制全文。
2. 仓库采用组织实践时，在本地文档中链接到 Handbook，并记录项目例外。
3. 跨仓库决策在项目目录记录共同结论，各仓库分别记录实施细节。
4. 代码行为与文档冲突时，先按事故处理：确认真实行为，再修正文档或实现。
5. 私有 Observation 晋升前必须完成证据复核、适用范围判断和脱敏。
6. 工具文档只记录当前产品能力和采用方式；跨工具成立的做法应晋升到 Principle、Pattern 或 Playbook。

## 内容生命周期

- `Draft`：正在探索，尚未形成组织承诺
- `Adopted`：已被至少一个项目采用并验证
- `Standard`：默认适用于所有相关项目
- `Deprecated`：不再推荐，但保留迁移背景
- `Superseded`：已被另一份文档明确取代

Best Practice 至少应达到 `Adopted`，并附有内部案例或可验证依据。
