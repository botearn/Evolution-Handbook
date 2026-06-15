# Evolution Handbook

团队共同维护的协作手册。这里只放跨项目长期有效的实践、项目契约和 AI Native 工作方式。

> 第一次来不用理解全部架构。先按任务找入口；找不到就从 `WORKSPACE.md` 开始。

## 先看哪里

| 你要做什么 | 从这里开始 |
|---|---|
| 不知道先读什么 | [Onboarding Quickstart](ONBOARDING.md) |
| Agent 开始执行任务 | [Agent 专用入口](AGENTS.md) |
| 了解 ARTI | [ARTI 项目入口](projects/arti/README.md) |
| 查 ARTI 当前 Todo / Bug | [ARTI 当前 Todo 与 Bug](projects/arti/current-todos-and-bugs.md) |
| 在飞书里和 OpenClaw 协作 | [飞书与 OpenClaw 协作](ai-native/workflows/feishu-openclaw-collaboration.md) |
| 使用 Codex、Claude Code 或 Feishu CLI | [AI 工具实践](ai-native/tooling/README.md) |
| 修文档、补案例或提出反例 | [参与贡献](CONTRIBUTING.md) |
| 不知道内容放哪里 | [内容路由](WORKSPACE.md) |
| 判断谁是真源 | [Source of Truth](SOURCE_OF_TRUTH.md) |

## 最简单的地图

本仓库主要分四块：

| 目录 | 放什么 |
|---|---|
| `projects/` | 项目边界、架构、契约、决策和项目 Playbook |
| `ai-native/` | 人和 Agent 如何协作，工具、工作流、权限和治理 |
| `practices/` | 跨项目通用实践和文档治理 |
| 根目录文件 | README、贡献方式、路由、真源和 Agent 入口 |

如果不知道放哪：先看 `WORKSPACE.md`，再看目标目录的 `README.md`。

## 五个约定

1. **真实系统优先。** 代码、Schema 和可执行资产是实现事实的真源。
2. **从 Draft 开始。** 未验证内容可以提交，但不能包装成组织 Standard。
3. **Agent 必须验证。** “已完成”需要测试、Diff、链接或回读结果支撑。
4. **高风险由人批准。** 发布、权限、结算、生产数据和外部正式消息不能默认自动执行。
5. **任何成员都能改。** README、链接、案例、反例和过期内容都欢迎直接修正。

## 常用入口

| 主题 | 入口 |
|---|---|
| 项目目录 | [projects/README.md](projects/README.md) |
| ARTI 架构 | [projects/arti/architecture.md](projects/arti/architecture.md) |
| ARTI 跨仓契约 | [projects/arti/contracts/README.md](projects/arti/contracts/README.md) |
| ARTI Playbook | [projects/arti/playbooks/README.md](projects/arti/playbooks/README.md) |
| AI Native | [ai-native/README.md](ai-native/README.md) |
| 风险等级 | [ai-native/governance/risk-and-automation-levels.md](ai-native/governance/risk-and-automation-levels.md) |
| 协作文化 | [practices/collaboration-culture.md](practices/collaboration-culture.md) |

## 内容状态

| 状态 | 含义 |
|---|---|
| `Draft` / `Pattern Candidate` | 可以讨论和试用，不是组织承诺 |
| `Adopted` | 至少一个项目采用并有证据 |
| `Standard` | 相关项目默认遵守，例外需要说明 |
| `Deprecated` / `Superseded` | 不再推荐或已被替代 |
| `Current` | 当前项目事实或契约快照，不等同于组织 Standard |

## 怎么贡献

小改动可以直接修：typo、断链、README 导航、过期描述、Draft 的限制或反例。

较大的内容先确认：

1. 看 `WORKSPACE.md` 判断归属。
2. 搜索是否已有真源。
3. 新内容默认标记为 Draft。
4. 更新所在目录的 `README.md`。
5. PR 里说明改了什么、依据是什么、怎么验证。

完整流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。

本仓库是公共 Handbook。不要提交密钥、客户数据、内部访问地址、本机路径或未脱敏的私密记录。
