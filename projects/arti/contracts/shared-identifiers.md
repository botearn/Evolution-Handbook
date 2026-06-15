# Shared Identifiers

**状态：Current with Known Drift**

**核对日期：2026-06-15**

跨仓库字符串值是协议，不是展示文案。

## AnswerKind

Owner：`arti/src/lib/answer-kind.ts`

要求：

- 存储值、API 值和跨语言映射完全一致。
- `AnswerKind` 表示“哪类 Query 产生结果”，不等同于 UI 的 Message Type。
- 新增值时同步分类器、Meta、DB 写入、读取方和测试。
- Backend 需要写入时，不得自行改成 camelCase 或另一套别名。

## NotificationKind

Owner：`arti/src/lib/notification-kind.ts`

要求：

- Writer 使用注册表中的精确字符串。
- 未知值由读取方降级成 `system`，但不能静默长期保留。
- 路由映射属于主站，不应散落在 Writer 中。

## Report Type

Owner：Backend 报告注册表与 `report_tasks` schema 共同约束。

要求：

- 创建入口、Worker registry、result assembler 和前端展示必须支持同一集合。
- 历史 alias 只能在读取兼容层存在。
- 新类型需要明确 engine、价格、结果族和 UI 入口。

## Stock Symbol

当前为跨语言双实现：

- Backend：`shared/arti_shared/stock_resolver.py`
- Web：TypeScript normalizer 与 extractor

Canonical 约定：

- 美股：大写 Ticker，例如 `NVDA`
- 港股：5 位数字加 `.HK`，例如 `00700.HK`
- A 股：6 位数字加 `.SS` 或 `.SZ`
- `.SH` 输入归一为 `.SS`
- 短英文词和裸数字不能在无上下文时被轻率识别为股票

所有存储和跨服务传输应使用 canonical symbol。展示名称在 UI boundary 归一，不把中文名或英文名混入 Symbol 字段。

## JSON 命名

- Python 内部 Domain Model 可以使用 snake_case。
- 对前端暴露的 DTO 使用 camelCase。
- 转换发生在明确的 boundary，不允许同一 Payload 混用两种命名。

## 漂移治理

发生跨仓差异时，按 [Known Drift Review](../playbooks/known-drift-review.md) 复核并输出 Owner、生产者、消费者、兼容窗口和退出条件。

在尚未建立共享包前，应维护一套跨语言固定用例：

- 所有枚举集合相等
- Symbol normalize 输入输出相等
- Report type 到 result family 映射相等
- Notification type 到路由映射覆盖完整
- DTO boundary 不混用 `snake_case` 和 `camelCase`
