# Credits and Settlement

**状态：Current**

**核对日期：2026-06-15**

**Shared DB Owner：`arti`**

## 核心不变量

1. 扣费发生在产出结果的服务端入口。
2. 前端只展示余额和预览，不直接调用消费 RPC。
3. 价格来自 `credit_pricing`，业务代码传 Action，不硬编码金额。
4. 缓存命中免费。
5. 扣费后未产出结果必须退款。
6. 下注和消费按经济性质使用不同余额语义。

## 服务端入口

| 场景 | 权威入口 |
|---|---|
| 报告 | `ARTI_backend` 报告创建服务 |
| 快速扫描 | 对应 Edge Function 或 Railway 服务 |
| Chat 按量计费 | Chat 服务端 |
| 预测 AI 分析 | `ARTi-poly` 服务端 |
| 下注与卖出 | `ARTi-poly` gateway + Shared DB RPC；仍有客户端经济学参数 |
| 市场结算 | Shared DB RPC / settlement job |

## 钱包语义

- `balance`：AI 消费与通用 Credits。
- `predict_balance`：预测市场可用余额。
- 周额度是窗口计算结果，不应被误建模为永久余额。
- `frozen_balance` 不得为负。

具体列名和资金优先级以当前 migration 为准。

## 发布顺序

涉及新计费 Action 时：

```text
定价行
  → DB RPC / permission
  → 服务端调用方
  → 前端展示
```

定价未先上线时，调用方可能返回 `pricing_not_found`。不得把前端 fallback 成免费执行。

## 共享 RPC 修改

修改 `place_bet`、`sell_position`、`settle_market` 等函数前：

- 查询生产当前函数定义
- 检查 `arti` 与 `ARTi-poly` 是否存在更新版本
- 只由当前 Owner 新增 migration
- 运行正常流程和对抗性直连测试
- 验证通知、流水和余额同时正确

## 已知完整性缺口

截至 2026-06-15，最新 `place_bet` 和 `sell_position` migration 仍接受客户端传入的：

- `shares`
- `proceeds`
- 新池子值
- 平均价格等经济学参数

现有服务端校验不能等同于“服务端重新计算”。`ARTi-poly` RFC-2026-0017 提出的服务端 LMSR 重算仍是 Proposed，不应被描述为已实施。

目标状态：

- 客户端只提交意图和金额
- 服务端锁定市场与仓位
- 服务端重新计算 Shares、Proceeds 和池子
- 客户端计算只用于预览
- 使用对抗性测试证明无法伪造成交结果

## 禁止

- 前端直接消费 Credits
- 新代码继续扩大对客户端成交份额、收益或池子值的信任
- 把预测市场预览算法当作服务端安全边界
- 从另一个仓库复制旧函数后整体 `CREATE OR REPLACE`
- 在缓存检查前扣费

## 实现真源

- [Server-authoritative Credits RFC](https://github.com/iloveopt/arti/blob/main/docs/rfcs/0010-server-authoritative-credits.md)
- [`arti` migrations](https://github.com/iloveopt/arti/tree/main/supabase/migrations)
- [Prediction trading authority proposal](https://github.com/botearn/ARTi-poly/blob/main/rfcs/2026/RFC-2026-0017-server-authoritative-credits.md)
- [Prediction market RFC index](https://github.com/botearn/ARTi-poly/tree/main/rfcs)
