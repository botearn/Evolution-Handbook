# Context System

上下文系统负责把真实工作中的证据转化为可检索记忆，再把反复验证的经验晋升为组织资产。

## 核心判断

Evolution Handbook 不是原始记忆池，而是经过审计的高密度知识层。

推荐分为四层：

```text
L0 Evidence       原始事实和工作产物
L1 Observations   有时间锚点的近期观察
L2 Reflections    合并、冲突分析和候选规律
L3 Standards      已采用的原则、契约、Skill 和 Playbook
```

## 层级职责

| 层级 | 内容 | 默认位置 | 加载方式 |
|---|---|---|---|
| L0 | 代码、PR、日志、会议记录、指标 | 原系统或项目仓库 | 按任务读取 |
| L1 | 近期事实、状态和教训 | 私有 Context Workspace | 检索后读取 |
| L2 | 主题反思、候选模式和冲突 | 私有 Context Workspace | 定期复审 |
| L3 | 组织长期知识 | Evolution Handbook | 路由后按需读取 |

## 设计原则

- Pull 优先：Agent 根据任务检索相关上下文，不把全部记忆推入 Prompt。
- 稀疏优先：默认加载索引和摘要，细节按需披露。
- 证据优先：每条长期规则应能追溯到真实案例。
- 晋升有门槛：一次事件不自动成为 Best Practice。
- Observer 与 Reflector 隔离：记录事实和修改规则不能在同一阶段完成。
- 公私分离：公共方法与私密上下文不进入同一仓库。

## 参考来源

本目录吸收过 [context-infrastructure](https://github.com/grapeot/context-infrastructure) 的部分机制：根级路由、规则/技能/记忆分层、Observer/Reflector 隔离、Pull 而非 Push、公私分离。只采用机制，不复制其个人工作区内容或运行时绑定。

## 导航

- [上下文生命周期](memory-lifecycle.md)
- [公共与私有边界](public-private-boundary.md)
- [运行上下文复审](../playbooks/run-context-review.md)
