# Shared Database Change

## 适用场景

修改多个仓库共同使用的：

- Table 或 Column
- RLS Policy
- RPC / Function
- Trigger
- Enum 字符串约束
- Realtime Publication

## 红线

- 已应用 migration 不回改。
- 非 Owner 仓库不发布共享对象 DDL。
- 不从另一仓库复制旧函数后整体覆盖。
- 不把文档里的 SQL 示例直接当生产 migration。
- 不在未核对生产定义时执行 `CREATE OR REPLACE FUNCTION`。

## 步骤

### 1. 确认 Owner

从 [项目真源](../source-of-truth.md) 查 Owner。没有 Owner 时，先做项目决策，不直接写 migration。

### 2. 读取三份事实

必须同时查看：

1. Owner 仓库最新 migration
2. 其他仓库对该对象的调用或历史 DDL
3. 生产当前 Schema 或函数定义

文件存在不代表 migration 已在生产应用。

### 3. 列出不变量

示例：

- `dedupe_key` 仍为非空并保持唯一
- `settle_market` 仍写通知
- Credits 锁顺序不变
- `report_tasks` 状态集合不变

### 4. 设计向前迁移

- 新建递增时间戳 migration
- 使用明确的前置检查
- 保留历史数据读兼容
- 需要回填时单独设计可重跑脚本

### 5. 检查所有消费者

搜索所有仓库中的：

- Table 名
- RPC 名
- 字段名
- Type 字符串
- Response shape

### 6. 验证

- 在 Branch、Staging 或等价环境应用
- 跑正常业务路径
- 跑重复请求和失败重试
- 跑越权与对抗性调用
- 验证余额、流水、通知和任务副作用

### 7. 发布

默认顺序：

```text
向后兼容 DB migration
  → Server writers
  → Readers / UI
  → Backfill
  → 删除旧兼容
```

### 8. 记录

- 在 migration 注释写明 Owner 和 RFC
- 更新跨仓契约
- 在姊妹 RFC 回填生产验证

## 事故触发条件

出现以下任一情况，停止继续发布并进入事故处理：

- 余额或结算结果不一致
- 权限范围扩大
- 通知或退款副作用丢失
- 新旧客户端无法同时工作
- 生产函数与预期 migration 不一致
