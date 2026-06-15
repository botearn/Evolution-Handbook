# Source of Truth and Bridges

**状态：Pattern Candidate**

## 问题

同一套方法需要在多个 Agent 宿主中使用时，复制正文会快速产生漂移。

## 模式

维护一份项目级真源，并为每个宿主创建薄 Bridge：

```text
project/skills/example/SKILL.md
  ├── ~/.claude/skills/example/SKILL.md
  ├── ~/.codex/skills/example/SKILL.md
  └── ~/.grok/skills/example/SKILL.md
```

Bridge 只负责：

- 提供统一名称和触发入口
- 指向真源绝对路径
- 要求宿主先读取真源

Bridge 不负责：

- 维护完整工作流
- 保存另一份示例和约束
- 针对每个宿主演化不同方法

## 何时采用

- 同一 Skill 需要在两个以上宿主使用
- 工作流需要随项目版本管理
- 多人需要共享同一套执行逻辑

## 不适用

- 只在单个宿主使用的个人临时 Prompt
- 与项目无关的全局小工具
- 尚未稳定到可以形成工作流的探索性对话
