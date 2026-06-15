# Report Result Contract

**状态：Current**

**核对日期：2026-06-15**

**Owner：`ARTI_backend`**

## 目的

`report_tasks.result` 是 Worker 写入、API 读取和主站渲染之间的 DTO 边界。

## 不变量

- 新结果必须由 canonical assembler 组装。
- DTO 字段使用 camelCase。
- 顶层必须能够判别报告类别。
- Writer 不再产生已废弃字段。
- Reader 必须能 normalize 仍存在的历史结果。
- HTML、Cards 和结构化分析数据可以并存，不能假设结果只有 HTML。

## 当前结果族

- `flash`
- `panorama`
- `stock-like`

`stock-like` 覆盖深度、盘前、盘后和兼容报告类型。字段级要求以 Backend 的 result contract 和类型代码为准。

## Writer 责任

- 使用对应 assembler，而不是手写任意字典落库。
- 在写入前执行契约验证。
- 新字段默认向后兼容。
- 旁路能力，例如预测写回或卡片双写，失败时不得破坏报告主交付，除非该能力被明确升级为强契约。

## Reader 责任

- 先 normalize 再消费。
- 对历史 alias 和缺失的判别字段保持兼容。
- 不通过 HTML 文本反向推导已经存在的结构化字段。
- 遇到未知 `renderVersion` 时保留可理解的降级展示。

## 修改检查

1. 更新 Backend types 和 assembler。
2. 更新 result validator。
3. 更新主站类型和渲染测试。
4. 检查历史数据 normalize。
5. 检查 benchmark、backfill 和部署验收脚本。
6. 需要破坏字段时先设计双写、双读和退出条件。

## 实现真源

- [Backend report result contract](https://github.com/botearn/ARTI_backend/blob/main/docs/report-result-contract.md)
- [Result assembler](https://github.com/botearn/ARTI_backend/blob/main/shared/arti_shared/report_result_assembler.py)
- [Shared types](https://github.com/botearn/ARTI_backend/blob/main/shared/arti_shared/types.py)
