# Run a Context Review

**状态：Draft**

## 目标

把近期真实工作转化为高密度观察，并定期晋升为可复用组织知识。

## Observer

建议每日或每周运行。

1. 确定时间窗口和扫描范围。
2. 收集变更文件、PR、RFC、事故和指标链接。
3. 过滤格式变化、生成文件和重复流水。
4. 只记录事实、状态和候选教训。
5. 追加到私有 Observation Store。
6. 不修改 Handbook 规则。

Observer 必须幂等：同一时间窗口重复执行不产生重复记录。

## Reflector

建议每周或每两周运行。

1. 读取 High 和仍活跃的 Medium Observation。
2. 按主题合并，不按日期机械摘要。
3. 查找反例、冲突和过期假设。
4. 形成晋升候选，并标注证据与适用范围。
5. 删除或归档过期 Low。
6. 由人类责任人批准后更新 Handbook。

## 晋升决策

| 判断 | 处理 |
|---|---|
| 一次性事件 | 留在 Observation |
| 项目短期状态 | 留在 L1/L2 |
| 多次出现但边界不清 | Pattern Candidate |
| 已验证的执行流程 | Playbook |
| 稳定跨场景判断 | Principle |
| 多仓共同约束 | Project Contract |

## 验收

- [ ] Observation 有时间和证据
- [ ] Observer 未直接改长期规则
- [ ] Reflector 检查了反例
- [ ] 公共内容完成脱敏
- [ ] 晋升内容有 Owner 和状态
- [ ] 过期内容被降级、归档或删除

## 自动化边界

Agent 可以自动完成扫描、聚类和候选草拟。以下动作默认需要人类批准：

- 把候选升级为组织 Standard
- 删除仍可能影响活跃项目的记忆
- 公开内部案例
- 修改安全、权限和责任边界
