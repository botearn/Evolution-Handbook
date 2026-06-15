# ARTI

**状态：Active**

ARTI 是 Evolution Handbook 当前登记的第一个项目。它由多个面向同一产品体系的仓库组成，而不是单一代码库。

## 项目目标

把市场数据、AI 分析、报告、记忆与预测市场连接成可验证的投研工作流。

项目当前覆盖：

- 主站、聊天、投研与用户记忆
- 快速扫描和异步深度报告
- 预测市场与 Credits
- CLI、MCP 和程序化数据访问
- 数据同步、报告 Worker 和后台任务

## 导航

- [系统架构](architecture.md)
- [仓库地图](repositories.md)
- [项目真源](source-of-truth.md)
- [跨仓库契约](contracts/README.md)
- [长期决策](decisions/README.md)
- [跨仓库 Playbook](playbooks/README.md)
- [AI Native 采用情况](ai-native.md)

## 项目级文档范围

本目录负责：

- ARTI 项目的整体边界和架构
- 两个以上 ARTI 仓库共同遵守的契约
- 跨仓库 RFC 和变更流程
- ARTI 对组织级实践的采用与例外

各仓库继续负责：

- 代码结构和本地规则
- 开发、测试与部署命令
- 单仓库 RFC
- API schema、migration 和可执行配置

## 当前架构判断

ARTI 处于持续收编阶段：

- 重型报告已由 Railway 后端和 Worker 承担，部分实时能力仍在 Supabase Edge Functions。
- 预测市场前端已进入主站代码树，但 API 网关和独立仓库仍继续运行。
- 多仓库共享同一 Supabase 业务平面，数据库函数和表的所有权必须显式管理。
- Prompt、枚举和 Agent 规则仍存在多份实现，需要逐步增加自动漂移检查。

因此本目录的首要作用不是描述一个“已经完成的目标架构”，而是明确当前边界、稳定不变量和演进中的过渡区。
