# Evolution Handbook

团队共同维护的组织操作手册。这里沉淀跨项目长期有效的实践、项目契约和 AI Native 工作方式。

> 第一次来不需要先理解全部目录。先找到与你当前任务有关的入口，边使用边补充。

## 30 秒上手

```mermaid
flowchart LR
    A["我现在要做什么？"] --> B{"选择入口"}
    B -->|"找项目信息"| C["Projects"]
    B -->|"使用 AI / Agent"| D["AI Native"]
    B -->|"补充或纠错"| E["Contributing"]
    B -->|"找组织规则"| F["Governance / Practices"]
    B -->|"不知道放哪里"| G["Knowledge Candidate"]

    C --> C1["ARTI 项目入口"]
    D --> D1["Codex / Claude Code<br/>OpenClaw / Feishu CLI"]
    E --> E1["直接改 README<br/>或提交 PR"]
    F --> F1["按目录 README 导航"]
    G --> G1["先记录事实<br/>Reviewer 帮助归类"]
```

| 你现在想做 | 从这里开始 |
|---|---|
| 了解 ARTI | [ARTI 项目入口](projects/arti/README.md) |
| 在飞书里和 OpenClaw 协作 | [飞书与 OpenClaw 协作](ai-native/workflows/feishu-openclaw-collaboration.md) |
| 使用 Codex、Claude Code 或 Feishu CLI | [AI 工具实践](ai-native/tooling/README.md) |
| 修文档、补案例或提出反例 | [参与贡献](CONTRIBUTING.md) |
| 不知道内容放哪里 | [内容路由](WORKSPACE.md) |
| 判断谁是真源 | [Source of Truth](SOURCE_OF_TRUTH.md) |

## 五个约定

先记住这五条，就可以开始参与：

1. **真实系统优先。** 代码、Schema 和可执行资产是实现事实的真源。
2. **从 Draft 开始。** 未验证的想法可以提交，但不能包装成组织 Standard。
3. **Agent 必须验证。** Agent 的“已完成”需要测试、Diff、链接或回读结果支撑。
4. **高风险由人批准。** 发布、权限、结算、生产数据和外部正式消息不能默认自动执行。
5. **任何成员都能改。** README、链接、案例、反例和过期内容都欢迎直接修正。

## AI Native 三条核心主张

| 原则 | 核心判断 | 完整说明 |
|---|---|---|
| End-to-End 对产品负责 | 不只对流程和局部交付负责，要对用户价值与产品结果负责 | [端到端产品责任](ai-native/principles/end-to-end-product-ownership.md) |
| 按 Trait 组队 | Job Family 提供专业基础，Trait 决定团队在不确定环境中的贡献方式 | [按 Trait 组队](ai-native/principles/trait-based-teams.md) |
| Context 就是竞争力 | 工具差距会缩小，Context 的质量、流转和可复用性会持续复利 | [上下文即基础设施](ai-native/principles/context-as-infrastructure.md) |

## 按角色导航

```mermaid
flowchart TB
    Start["团队成员"] --> Role{"我主要关心什么？"}

    Role --> Eng["工程"]
    Role --> Product["产品 / 项目"]
    Role --> Ops["运营 / 协作"]
    Role --> Agent["Agent 维护"]
    Role --> Contributor["知识贡献"]

    Eng --> Eng1["项目架构与跨仓契约"]
    Eng --> Eng2["Codex / Claude Code"]

    Product --> Product1["项目边界与决策"]
    Product --> Product2["领域知识与案例"]

    Ops --> Ops1["OpenClaw + 飞书流程"]
    Ops --> Ops2["Playbook 与风险等级"]

    Agent --> Agent1["指令 / Skill / Context"]
    Agent --> Agent2["权限 / Sandbox / Review"]

    Contributor --> Contributor1["README / Draft PR"]
    Contributor --> Contributor2["Knowledge Candidate"]
```

| 角色 | 推荐入口 |
|---|---|
| 工程 | [项目目录](projects/README.md) · [ARTI 架构](projects/arti/architecture.md) · [AI 工具](ai-native/tooling/README.md) |
| 产品 / 项目 | [项目边界](projects/README.md) · [长期决策](projects/arti/decisions/README.md) · [跨仓契约](projects/arti/contracts/README.md) |
| 运营 / 协作 | [OpenClaw 协作](ai-native/workflows/feishu-openclaw-collaboration.md) · [风险等级](ai-native/governance/risk-and-automation-levels.md) |
| Agent 维护 | [Agent System](ai-native/agent-system/README.md) · [Context System](ai-native/context-system/README.md) |
| 所有人 | [贡献指南](CONTRIBUTING.md) · [模板](templates/README.md) |

## 一次协作如何沉淀

下面是从飞书请求到组织知识的完整路径。不是每个任务都需要走到最后。

```mermaid
flowchart LR
    A["飞书提出任务"] --> B["OpenClaw 澄清与分级"]
    B --> C{"任务类型"}

    C -->|"代码"| D["Codex / Claude Code"]
    C -->|"飞书资源操作"| E["Feishu CLI"]
    C -->|"知识草稿"| F["Knowledge Agent"]

    D --> G["PR / Diff + 测试证据"]
    E --> H["Dry Run + 执行 + 回读"]
    F --> I["Draft PR / Candidate"]

    G --> J["人类 Review"]
    H --> J
    I --> J

    J --> K{"是否可复用？"}
    K -->|"否"| L["留在任务或项目"]
    K -->|"是，但未充分验证"| M["Draft / Pattern Candidate"]
    K -->|"已采用并验证"| N["Adopted"]
    N --> O["多项目默认采用后<br/>才成为 Standard"]
```

## 文档状态

看到 `Draft` 不代表团队必须遵守。

```mermaid
stateDiagram-v2
    [*] --> Candidate: 观察或想法
    Candidate --> Draft: 整理成可审查文档
    Draft --> Adopted: 项目采用并验证
    Adopted --> Standard: 成为相关项目默认做法
    Draft --> Deprecated: 试用失败或不再推荐
    Adopted --> Deprecated: 出现更好方案
    Standard --> Superseded: 被新规则替代
```

| 状态 | 含义 |
|---|---|
| `Draft` / `Pattern Candidate` | 可以讨论和试用，不是组织承诺 |
| `Adopted` | 至少一个项目采用并有证据 |
| `Standard` | 相关项目默认遵守，例外需要说明 |
| `Deprecated` / `Superseded` | 不再推荐或已被替代 |
| `Current` | 当前项目事实或契约快照，不等同于组织 Standard |

## Handbook 地图

```mermaid
flowchart TB
    H["Evolution Handbook"] --> G["governance<br/>责任、风险、边界"]
    H --> P["practices<br/>跨项目工程实践"]
    H --> AI["ai-native<br/>人和 Agent 如何协作"]
    H --> Projects["projects<br/>项目边界、决策、契约"]
    H --> Templates["templates<br/>可复制文档结构"]
    H --> Registry["registry<br/>项目与仓库登记"]

    AI --> Principles["principles"]
    AI --> Operating["operating-model"]
    AI --> Context["context-system"]
    AI --> Workflows["workflows"]
    AI --> Tooling["tooling"]
    AI --> Playbooks["playbooks"]

    Projects --> ARTI["ARTI"]
    ARTI --> Architecture["architecture"]
    ARTI --> Contracts["contracts"]
    ARTI --> Decisions["decisions"]
    ARTI --> ProjectPlaybooks["playbooks"]
```

详细目录路由保存在 [WORKSPACE.md](WORKSPACE.md)，文档所有权保存在 [SOURCE_OF_TRUTH.md](SOURCE_OF_TRUTH.md)。

## 全员共同维护

这个仓库不是少数维护者的专属空间。任何团队成员都可以：

- 直接更新 README、导航、链接和过期描述
- 补充项目实践、失败经验和真实来源
- 提交案例候选、反例和废弃建议
- 将重复工作整理为 Pattern、Playbook 或模板

不确定归属时，先提交 [Knowledge Candidate](https://github.com/botearn/Evolution-Handbook/issues/new?template=knowledge-candidate.md) 或 Draft PR，不需要预先理解全部架构。

本仓库是公共 Handbook。不要提交密钥、客户数据、内部访问地址、本机路径或未脱敏的私密记录。

完整流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。
