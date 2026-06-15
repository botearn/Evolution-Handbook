# Context and Memory Lifecycle

**状态：Draft**

## L0：Evidence

原始证据包括：

- 代码、Commit、PR 和 RFC
- 测试结果、生产日志和指标
- 用户反馈、会议记录和调研材料
- 事故时间线和发布结果

L0 应保留在最接近所有者的位置。Handbook 不复制大段原始材料，只保存链接和结论。

## L1：Observation

Observation 是带时间锚点的事实判断，不是长期规则。

推荐字段：

```yaml
date: 2026-06-15
scope: project/arti
topic: shared-database
confidence: high
evidence:
  - repository-or-system-reference
observation: 修改共享 RPC 时，单侧旧定义会覆盖对端新增副作用。
```

优先级可以分为：

- High：候选长期规律、红线或重大架构变化
- Medium：未来数周仍需使用的项目状态和权衡
- Low：短期流水和一次性排障信息

L1 默认追加写入，避免在采集阶段改写历史。

## L2：Reflection

Reflector 定期处理 Observation：

- 删除过期 Low
- 合并同主题 Medium
- 对冲突观察保留双方证据
- 识别重复出现的规律
- 形成 Principle、Pattern、Contract 或 Playbook 候选

Reflector 不应仅做摘要。它必须回答：

- 这条经验是否跨场景成立
- 适用边界是什么
- 是否有反例
- 已验证几次
- 晋升后由谁维护

## L3：Standard

进入 Handbook 的内容应满足：

1. 来源和适用范围清晰。
2. 已脱敏，适合公共仓库。
3. 至少有一个真实采用案例。
4. 能说明何时不适用。
5. 有验证方式和维护 Owner。

不同产物的晋升位置：

| 候选 | 目标位置 |
|---|---|
| 长期判断 | `principles/` |
| 重复结构 | `patterns/` |
| 可执行流程 | `playbooks/` |
| 跨仓行为 | `projects/<project>/contracts/` |
| 项目方向 | `projects/<project>/decisions/` |
| 可复用 Agent 能力 | 项目 `skills/` 真源 |

## 反馈闭环

L3 不是终点。实际使用时应记录：

- 是否降低了决策时间
- 是否避免了已知错误
- 是否产生误导或过度约束
- 是否需要缩小适用范围

失败证据可以让规则降级为 Draft、Deprecated 或被新规则取代。
