# Public and Private Context Boundary

**状态：Draft**

## 两个空间

推荐把上下文基础设施拆成两个空间：

### Public Handbook

保存：

- 通用原则和工作流
- 已脱敏的项目架构与契约
- 公共模板
- 可公开的案例和参考实现

不保存：

- 个人画像
- 未脱敏经营数据
- 原始工作日志
- 客户和账号信息
- 生产凭据与内部访问方式

### Private Context Workspace

保存：

- 用户和团队偏好
- 每日观察与反思
- 私密会议和经营上下文
- 内部事故证据
- 本地 Overlay、别名和路径

私有 Workspace 可以引用 Handbook；Handbook 不反向依赖私密内容才能被理解。

## Public Core + Private Overlay

工具和 Skill 也遵守同一结构：

```text
Public Core
  - 通用 Contract
  - CLI / Schema
  - 测试
  - 文档

Private Overlay
  - 账号和 Token
  - 联系人别名
  - 内部 Endpoint
  - 客户和业务默认值
```

不要 Fork 一份公共 Skill 后把私密配置硬编码进去。优先通过环境变量、本地配置或薄 Bridge 叠加。

## 晋升前脱敏

从私有 Observation 晋升到公共 Handbook 前，检查：

- 是否包含真实姓名、邮箱或客户名
- 是否包含内部 URL、项目 ID 或本地绝对路径
- 是否暴露密钥形态、账号或权限结构
- 案例是否可以抽象而不失去关键教训
- 原始证据是否应只保留内部链接

无法脱敏的内容可以留在私有 L2，不必强行公开。
