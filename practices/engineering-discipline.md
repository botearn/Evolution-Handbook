# Engineering Discipline

**状态：Draft**
**最后核对：2026-06-23**
**适用范围：所有涉及生产数据库、代码提交、服务部署的开发者，包括非研发背景的 Vibe Coder**

---

## 数据库操作

生产数据库（prod）只能通过以下方式操作：

- 经过 code review 的 migration 文件
- 走了完整测试流程的脚本
- 紧急情况下，需要 lead 在场确认，操作后立即补文档

**禁止**：打开数据库 GUI 工具（TablePlus、DBeaver 等），直接手动 UPDATE / DELETE / 改字段。哪怕是"只改一条数据"。

> 原因：改了什么没有记录，别人不知道，回滚无从下手，下次 migration 可能直接冲突崩掉。

### Migration 规范

- 哪怕只是加一个索引、改一个字段的默认值，也要写 migration
- 文件名要有时间戳和描述，例如：`20260623_add_index_to_leads_email.sql`
- migration 文件要可重复执行（用 `IF NOT EXISTS` 等幂等写法）
- 提交到 git，和代码一起 review

### 执行顺序：先查再改

```sql
-- 第一步：先查，确认要改的行数和内容
SELECT * FROM users
WHERE status = 'inactive'
  AND last_login < '2025-01-01';

-- 确认结果符合预期后，再执行修改
UPDATE users
SET deleted_at = NOW()
WHERE status = 'inactive'
  AND last_login < '2025-01-01';
```

大批量操作时（超过 1000 行）分批执行，加 `LIMIT`，观察一批再继续。

### 用事务保护写操作

```sql
BEGIN;
UPDATE orders SET status = 'cancelled' WHERE ...;
SELECT ROW_COUNT(); -- 先确认影响行数
COMMIT;             -- 没问题再提交
-- 或者 ROLLBACK;
```

---

## 环境管理

### 第零步：确认当前环境

**动手前必做**：

```bash
echo $DATABASE_URL
echo $NODE_ENV
echo $APP_ENV
```

看到 `prod` / `production` 字样立刻停手，先确认为什么会连到生产环境。

### 环境隔离规则

- `.env.local` → 连接本地或 dev 数据库
- `.env.staging` → 连接 staging
- 生产数据库的连接串不能出现在本地开发配置里
- 生产凭证不能写进代码、不能提交到 git
- 不能用生产数据库做开发。本地应运行独立的数据库实例（Docker、本地安装等），与生产环境完全隔离

### 生产环境调试

先在本地或 staging 复现问题，再制定修复方案，再走正常部署流程。

**禁止**：在生产服务器上 ssh 进去敲命令调试，或直接修改文件、重启进程、手动执行脚本——除非经 lead 批准的紧急响应程序。

---

## 代码提交

### 一个 PR，一个目的

不要混合 bug fix + 新功能 + 重构。reviewer 更容易理解，出问题更容易 revert，CI 失败更容易定位。

### 提交前检查清单

- [ ] 有没有遗留的 `console.log` / `print` / `debugger`
- [ ] 有没有硬编码的 URL、密钥、配置值
- [ ] 逻辑有没有明显漏洞（边界条件、空值处理）
- [ ] 有没有未处理的 TODO 应该在这个 PR 完成

### Commit Message 格式

使用 Conventional Commits：`type(scope): description`

**不好的写法：**
```
fix bug
update code
wip
改了一下
```

**好的写法：**
```
fix(auth): handle expired JWT token gracefully
feat(leads): add email dedup on import
refactor(db): extract query builder helper
fix(api): return 400 on missing required fields
```

---

## 凭证与密钥

密码、API key、token、数据库连接串——**不能进 git**。一旦提交到远程仓库，即使删掉提交记录，也已经泄露（GitHub 会扫描历史）。

- 所有凭证放 `.env` 文件，确保 `.env` 在 `.gitignore` 里
- 代码里只引用环境变量，不硬编码值
- 建议安装 git pre-commit hook 自动扫描

---

## 后端校验

类型、范围、权限都要在后端验证。前端的校验是用户体验，后端的校验是安全。

- **类型检查**：字符串不能当 int 用，不能直接塞进 SQL
- **范围检查**：`page_size` 最大 100，`price` 必须 > 0
- **权限检查**：当前用户是否有权限访问该资源，每个接口单独验证，不能依赖客户端传来的 role

---

## 错误处理与日志

### 不要静默失败

```js
// ❌ 静默失败
try {
  await sendEmail(user)
} catch (e) {
  // 什么都不做
}

// ✅ 正确处理
try {
  await sendEmail(user)
} catch (e) {
  logger.error('sendEmail failed', {
    userId: user.id,
    error: e.message
  })
  throw e // 或返回错误状态
}
```

### 日志规范

- 关键操作要有日志：创建订单、支付完成、权限变更、批量操作
- 日志里不能含敏感数据：密码、完整 token、银行卡号
- 日志要有上下文：`user_id`、`request_id`、操作类型
- 不要在 for 循环里每条都打日志（高频操作）

---

## 外部调用与重试

```js
// ✅ 有 timeout + 指数退避重试
const response = await fetch(url, {
  signal: AbortSignal.timeout(5000), // 5s timeout
})

// 重试：等待 2^attempt * 100ms
const delay = Math.pow(2, attempt) * 100
await new Promise(r => setTimeout(r, delay))
```

- 所有外部 HTTP 调用必须设 timeout，不能无限等待
- 重试使用指数退避（exponential backoff），不能立即无限重试
- 触发重试的操作必须是幂等的，否则重试会造成数据重复

---

## 上线流程

### Staging 验证

每次上线前，必须在 staging 环境完整跑一遍核心流程：

- 这次改动影响到的功能路径
- migration 在 staging 上先执行一遍，确认无报错
- 关联的 API 接口返回值是否符合预期

> staging 出问题是低成本的，生产出问题是高成本的。

### 部署顺序

1. **先执行 migration**，确认成功
2. **再部署新代码**

**禁止**：先上代码再跑 migration——新代码依赖的字段还不存在，线上会直接报错。

### 回滚优先

发现线上有问题的第一反应是：回滚到上一个稳定版本。不要试图在生产环境现场 hot-fix。

- 每次部署前确认回滚方案可执行
- 回滚时间超过 5 分钟说明回滚流程需要优化
- 回滚后再在本地/staging 复现并修复，重新走上线流程

---

## 核心问题

> **"如果这个操作出错了，我能恢复吗？"**

每次要执行一个操作之前，问自己这个问题。如果答案是"不知道"或"不确定"，先停下来搞清楚，再动。这不是谨慎，这是专业。
