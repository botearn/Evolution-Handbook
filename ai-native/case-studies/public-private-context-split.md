---
status: Draft
owner: 待指定
scope: organization
last_reviewed: 2026-06-15
---

# Public Handbook and Private Context Split

**状态：Draft**

**Owner：待指定**

## 背景与目标

团队需要沉淀 AI 协作经验，但不是所有上下文都适合进入公共 Handbook。

目标：把长期、脱敏、可复用的知识放到 Handbook；把个人偏好、原始观察、客户信息、本机路径和密钥留在私有 Context Workspace。

## 原有方式

如果不分层，容易出现两种问题：

- 公共文档夹带私密上下文。
- 有价值经验只留在个人记忆里，团队无法复用。

## 引入的实践

- `SOURCE_OF_TRUTH.md` 定义 Handbook、项目文档、仓库文档和代码真源。
- `WORKSPACE.md` 定义内容路由。
- `ai-native/context-system/` 定义 L0-L3 上下文层级。
- `public-private-boundary.md` 明确哪些内容不能进入公共仓库。

## 责任分配

| 角色 | 责任 |
|---|---|
| 贡献者 | 提交前脱敏，区分事实和经验 |
| Reviewer | 检查隐私、真源和适用范围 |
| Agent | 帮助整理，但不得把私有记忆直接写入公共文档 |

## 结果

当前 Handbook 已明确：

- 公共仓库不放密钥、客户数据、本机路径、私密会议记录。
- 原始 Observation 不直接晋升为 Standard。
- 长期知识需要证据、适用范围和复审。

## 限制

- 私有 Context Workspace 的实际执行仍依赖个人习惯。
- 目前还没有自动扫描所有隐私风险。
- 哪些经验值得晋升，仍需要人工判断。

## 可复用结论

- 公共 Handbook 应保存“可复用结论”，不是原始记忆池。
- 私密上下文可以帮助个人工作，但进入组织知识前必须脱敏和复核。
- Agent 写文档时，先判断内容层级比直接总结更重要。

## 证据

- `SOURCE_OF_TRUTH.md`
- `WORKSPACE.md`
- `ai-native/context-system/README.md`
- `ai-native/context-system/public-private-boundary.md`
