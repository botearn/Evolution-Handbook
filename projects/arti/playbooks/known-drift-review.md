# Known Drift Review

**状态：Draft**

**Owner：待指定**

用于处理 ARTI 跨仓共享标识、枚举、Prompt 和 DTO 漂移。

## 适用场景

两个以上 ARTI 仓库对同一业务对象、字符串值或数据形状解释不一致时使用。

典型对象：

- `AnswerKind`
- `NotificationKind`
- Report Type
- Stock Symbol normalization
- DTO `snake_case` / `camelCase`
- Prompt、Agent registry、report config

## 触发条件

出现任一情况时，不继续单仓修改：

1. 改动会影响跨仓存储或传输值。
2. 新 canonical 值尚未被消费者确认。
3. 读取方依赖 alias、fallback 或历史兼容层。
4. 生产数据已有多种表示。
5. 文档、测试和代码命名不一致。

## 输入

- Owner 和真源文件
- 生产者和消费者
- 主分支当前实现
- 生产或当前数据中的实际值
- 相关测试、RFC、契约、migration
- 已知 alias、fallback、兼容路径

## 步骤

1. 定义 canonical 值、含义和 Owner。
2. 搜索所有生产者：server、Edge、Worker、CLI、migration、Prompt parser。
3. 搜索所有消费者：读取、路由、展示、反序列化和兼容层。
4. 设计兼容窗口：

```text
新增读取兼容
  → 收敛写入 canonical 值
  → 回填历史数据
  → 添加漂移检查
  → 删除 alias / fallback
```

- 增加固定用例：枚举集合、Symbol normalize、Report type 映射、Notification 路由、DTO 命名。
- 更新相关 Contract、Decision、README 或 RFC。

## 输出

- canonical 值和 Owner
- 生产者 / 消费者清单
- 兼容策略和退出条件
- 测试或回读证据
- 遗留事项和负责人

## 完成标准

- [ ] 生产者写入同一 canonical 值
- [ ] 消费者兼容当前生产数据
- [ ] alias / fallback 有退出条件
- [ ] 契约和索引已同步
- [ ] 有固定用例或自动检查防止再次漂移

## 停止与升级

以下情况升级为项目决策或事故处理：

- 影响 Credits、结算、权限或数据完整性
- 无法确认生产真实值
- 两个以上仓库需要破坏性变更
- Owner 不明确
- 兼容窗口没有退出条件
