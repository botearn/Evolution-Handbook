# Multi-Repository Release Coordination

## 目标

让跨仓变更按依赖顺序发布，并能在不扩大事故面的情况下回滚。

## 发布计划最小字段

| 字段 | 内容 |
|---|---|
| 变更 | 用户可见行为 |
| Contract Owner | 谁先发布 |
| Producers | 哪些服务写新格式 |
| Consumers | 哪些服务读新格式 |
| DB migration | 是否需要，是否向后兼容 |
| Feature flag | 名称和默认值 |
| 验证 | 每阶段观察什么 |
| 回滚 | 回滚代码还是关闭 Flag |

## 推荐顺序

### 向后兼容变更

```text
DB 扩展
  → 能读新旧格式的 Consumer
  → 写新格式的 Producer
  → 数据回填
  → 删除旧读写
```

### 新服务端能力

```text
定价 / 权限 / Schema
  → Backend
  → Gateway
  → Web / CLI
```

### 路由迁移

```text
新目标可独立验证
  → 双入口
  → 少量流量
  → 主入口切换
  → 旧入口重定向
  → 删除兼容代码
```

## 阶段验证

每次切换只验证当前新增风险：

- DB：Schema、RLS、RPC 和副作用
- Backend：健康检查、日志、任务状态
- Gateway：认证、错误码和 CORS
- Web：登录态、主路径和错误呈现
- Worker：队列深度、重复消费和结果契约

## 回滚原则

- 优先关闭 Feature Flag 或回退流量。
- append-only DB 变更通常保留，代码回到旧读法。
- 不用破坏性 migration 作为第一回滚手段。
- 避免同时回滚多个仓库；从最外层 Consumer 开始缩小影响。
- 回滚后仍需验证退款、通知和异步任务是否留有孤儿状态。

## 完成后

- 更新 RFC 状态和实际发布顺序
- 记录与计划不同的地方
- 删除不再需要的双入口和临时 Flag
- 将事故或意外沉淀为契约测试
