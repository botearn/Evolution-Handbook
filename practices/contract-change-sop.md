# Contract Change SOP

**状态：Draft**

用于修改两个以上项目或仓库共同依赖的 Contract。

## 什么时候用

- API response shape 变化
- DB schema / RPC / enum 变化
- 共享事件、任务状态、通知类型变化
- CLI / MCP 输出契约变化
- 删除字段、改名、改语义或改错误码

## 角色

| 角色 | 责任 |
|---|---|
| Contract Owner | 定义变更和兼容策略 |
| Producer | 保证输出符合新旧契约 |
| Consumer | 确认读取兼容和迁移计划 |
| Reviewer | 检查影响范围、验证和退出条件 |

## SOP

1. 写清变更类型：兼容 / breaking / 废弃。
2. 列出所有 Producer 和 Consumer。
3. 给出迁移顺序和兼容窗口。
4. 通知受影响 Owner。
5. 先合并读取兼容，再切换写入。
6. 跑跨仓验证。
7. 更新 Contract、Decision、README 和 Registry。
8. 到期删除旧兼容路径。

## Breaking change 额外要求

必须有：

- 影响清单
- 迁移窗口
- 回滚方式
- 测试证据
- 明确 Owner 批准

默认发布顺序：

```text
Readers 兼容新旧格式
  → Producers 写新格式
  → 数据迁移 / 回填
  → 删除旧兼容
```

## 通知内容

通知应包含：

- 改什么
- 为什么改
- 影响哪些仓库
- 什么时候切换
- 谁负责验证
- 失败怎么回滚

## 完成标准

- [ ] 所有消费者已确认
- [ ] 兼容窗口和退出条件明确
- [ ] 跨仓测试或手动验证完成
- [ ] Contract 和索引已更新
- [ ] 旧路径删除时间已记录
