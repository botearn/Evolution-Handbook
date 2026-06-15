# Notifications

**状态：Current**

**核对日期：2026-06-15**

**Owner：`arti`**

## 核心不变量

- 所有服务端写入统一调用 `notify_user()`。
- 不允许业务代码裸 `INSERT INTO notifications`。
- 每个可重试事件必须提供稳定 `dedupe_key`。
- 通知类型字符串以主站注册表为准。
- DB 不用硬编码的 Type CHECK 代替应用注册表。
- 表 schema 只由 Owner 仓库 migration 修改。

## 写入者

- `report_tasks` 终态通过 DB trigger 产生报告通知。
- 预测结算任务按用户聚合通知。
- Credits 和市场结算 RPC 产生对应通知。
- `ARTi-poly` 可以调用公共 helper，但不拥有共享表 DDL。

## 读取者

主站负责：

- 未读数量和 Realtime 订阅
- 类型到图标、文案和站内路由的映射
- 未知类型的安全 fallback
- 标记单条或全部已读

通知到达和页面内结果展示可以并存，但必须避免重复副作用。

## Dedupe Key

推荐格式：

```text
<type>:<business-id>[:<scope>]
```

示例：

- `report_done:<task-id>`
- `prediction_settled:<user-id>:<date>`
- `credits_result:<market-id>:<user-id>`

## 修改检查

- 新类型是否加入注册表和测试
- 写入是否走 `notify_user`
- 是否需要 Toast
- 跳转目标是否为站内 canonical route
- 重试是否产生重复通知
- Poly 和主站是否都能读取

## 实现真源

- [Global notification RFC](https://github.com/iloveopt/arti/blob/main/docs/rfcs/0013-notification-system.md)
- [Notification registry](https://github.com/iloveopt/arti/blob/main/src/lib/notification-kind.ts)
- [`notify_user` migration](https://github.com/iloveopt/arti/blob/main/supabase/migrations/20260611150000_notification_system.sql)
