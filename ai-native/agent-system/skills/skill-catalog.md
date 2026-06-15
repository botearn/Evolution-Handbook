# Skill Catalog

**状态：Draft**

## 文档与知识

| 名称 | 用途 | 适合场景 | 注意 |
|---|---|---|---|
| `deep-research` | 多源研究和事实核查 | 需要引用、对比、验证的研究问题 | 问题太宽时先澄清 |
| `verify` | 手动验证变更是否真的工作 | UI、交互、端到端行为 | 不替代自动测试 |
| `run` | 启动项目或应用观察结果 | 需要截图、运行效果或真实 app 行为 | 先确认启动方式 |
| `code-review` | Review 当前 diff | 合并前找 bug 和风险 | 实现者和 Reviewer 最好分上下文 |
| `simplify` | 简化改动、减少重复 | 代码已能工作但偏复杂 | 不负责找 correctness bug |

## Claude Code 工作流

| 名称 | 用途 | 适合场景 | 注意 |
|---|---|---|---|
| Plan Mode | 先探索再写计划 | 多文件、架构、需求不清 | 不要用于 typo 小改 |
| Explore subagent | 只读搜索和定位 | 需要扫很多文件但不想污染主上下文 | 只要结论，不要全文 dump |
| Worktree | 隔离修改 | 并行实验或高风险重构 | 只有明确需要时使用 |
| Hook | 强制动作 | lint、权限、审计、禁止路径 | 先验证流程稳定再升级成 Hook |

## MCP / 外部系统

| 名称 | 用途 | 适合场景 | 注意 |
|---|---|---|---|
| GitHub MCP | Issue、PR、Review 操作 | 需要创建 PR 或查仓库元数据 | 写操作先 dry-run |
| Feishu CLI / MCP | 飞书消息和文档操作 | 团队协作、通知、任务入口 | 不写入 token；外部发送前确认 |
| Browser / UI 工具 | 观察真实界面 | 验证交互和视觉 | 记录截图或可复现路径 |

## 外部 Skill Stack

| 名称 | 用途 | 适合场景 | 注意 |
|---|---|---|---|
| [gstack](https://github.com/garrytan/gstack) | Claude Code skill stack 参考 | 想快速参考一组现成 skills / workflows | 先读源码和权限边界，不直接复制进生产工作区 |

## 加入新 Skill 的标准

- 至少在一个真实任务中用过。
- 能说清楚输入、输出和完成标准。
- 不依赖个人密钥或私有路径。
- 有失败边界：什么时候不要用。
