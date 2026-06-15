# Report Task Lifecycle

**状态：Current**

**核对日期：2026-06-15**

**Schema Owner：`arti`**

**Runtime Owner：`ARTI_backend`**

## 目的

`report_tasks` 是浏览器、Backend API、Worker、通知和退款机制之间的异步边界。

## 状态机

```text
pending
  → processing
      ├→ done
      └→ failed

processing
  → pending    仅恢复或重试流程
```

合法终态为 `done` 和 `failed`。消费者不得创造新的状态字符串而不先修改 schema 和全部读取方。

## 生产者责任

创建任务的服务端入口必须：

1. 验证用户身份和请求。
2. 先检查可复用缓存。
3. 需要计费时，在服务端完成原子扣费。
4. 创建 `report_tasks` 行并关联扣费交易。
5. 将任务可靠放入队列。
6. 入队失败时标记失败并触发对应退款语义。

新入口不得绕过服务端，允许浏览器直接伪造任务状态或扣费关联。

## Worker 责任

Worker 必须：

- 消费队列后将任务推进为 `processing`
- 对单个 Analyst 失败执行可控降级
- 使用 canonical result assembler 写入结果
- 成功时写 `done` 和完成时间
- 失败时写 `failed` 和可诊断错误
- 保持任务处理幂等，避免重复副作用

恢复程序可以把确认失去有效 Job 的僵尸任务从 `processing` 重置为 `pending`。重置不是普通业务状态迁移。

## 消费者责任

主站可以通过 Realtime、查询或轮询观察任务，但必须：

- 把状态作为服务端事实
- 对重复事件保持幂等
- 不把组件卸载等同于取消任务
- 对未知或缺失结果显示可恢复状态

## 副作用

任务终态可能触发：

- 报告完成或失败通知
- 失败退款
- Chat 中的报告就绪卡片
- 预测目标价回写

这些副作用必须有幂等键或唯一约束，不应依赖一次性前端回调。

## 修改检查

- 状态集合是否变化
- Realtime 和查询客户端是否兼容
- Worker 恢复逻辑是否兼容
- 通知 trigger 是否兼容
- 退款 trigger 是否兼容
- 历史任务是否需要 read-side normalize

## 实现真源

- Schema：[`arti/supabase/migrations`](https://github.com/iloveopt/arti/tree/main/supabase/migrations)
- Runtime：[`ARTI_backend/shared/arti_shared/queue_tasks.py`](https://github.com/botearn/ARTI_backend/blob/main/shared/arti_shared/queue_tasks.py)
- Worker entry：[`ARTI_backend/worker/entrypoint.py`](https://github.com/botearn/ARTI_backend/blob/main/worker/entrypoint.py)
