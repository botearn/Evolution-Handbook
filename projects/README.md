# Projects

项目是面向同一产品目标或业务结果的一组仓库和服务，不等同于单个 Git 仓库。

每个项目目录应包含：

```text
projects/<project>/
├── README.md          项目目标、边界和负责人
├── architecture.md    项目级系统结构
├── repositories.md    仓库与服务地图
├── ai-native.md       采用的组织实践与例外
├── contracts/         跨仓库契约
├── decisions/         项目级长期决策
└── playbooks/         项目级操作手册
```

只有跨越仓库边界的内容才进入项目目录。单仓库实现细节继续留在对应仓库。

## 当前项目

- [ARTI](arti/README.md)
