import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Evolution Handbook',
  description: '团队共同维护的协作手册',
  lang: 'zh-CN',

  // Use README.md as index
  rewrites: {
    'README.md': 'index.md',
    'ai-native/README.md': 'ai-native/index.md',
    'ai-native/principles/README.md': 'ai-native/principles/index.md',
    'ai-native/operating-model/README.md': 'ai-native/operating-model/index.md',
    'ai-native/context-system/README.md': 'ai-native/context-system/index.md',
    'ai-native/tooling/README.md': 'ai-native/tooling/index.md',
    'ai-native/agent-system/README.md': 'ai-native/agent-system/index.md',
    'ai-native/patterns/README.md': 'ai-native/patterns/index.md',
    'ai-native/playbooks/README.md': 'ai-native/playbooks/index.md',
    'ai-native/case-studies/README.md': 'ai-native/case-studies/index.md',
    'ai-native/governance/README.md': 'ai-native/governance/index.md',
    'ai-native/agent-system/skills/README.md': 'ai-native/agent-system/skills/index.md',
    'projects/README.md': 'projects/index.md',
    'projects/arti/README.md': 'projects/arti/index.md',
    'projects/arti/contracts/README.md': 'projects/arti/contracts/index.md',
    'projects/arti/playbooks/README.md': 'projects/arti/playbooks/index.md',
    'projects/arti/decisions/README.md': 'projects/arti/decisions/index.md',
    'projects/arti/product/README.md': 'projects/arti/product/index.md',
    'practices/README.md': 'practices/index.md',
  },

  themeConfig: {
    logo: '🧬',
    siteTitle: 'Evolution Handbook',

    nav: [
      { text: '首页', link: '/' },
      { text: 'AI Native', link: '/ai-native/' },
      { text: 'ARTI 项目', link: '/projects/arti/' },
      { text: '通用实践', link: '/practices/' },
    ],

    sidebar: {
      '/ai-native/': [
        {
          text: 'AI Native',
          link: '/ai-native/',
          items: [
            {
              text: '原则',
              link: '/ai-native/principles/',
              collapsed: false,
              items: [
                { text: '端到端产品责任', link: '/ai-native/principles/end-to-end-product-ownership' },
                { text: '按 Trait 组队', link: '/ai-native/principles/trait-based-teams' },
                { text: '上下文即基础设施', link: '/ai-native/principles/context-as-infrastructure' },
                { text: '验证优先', link: '/ai-native/principles/verification-first' },
                { text: '人类责任不可外包', link: '/ai-native/principles/human-accountability' },
                { text: '自动化边界与风险匹配', link: '/ai-native/principles/automation-boundaries' },
              ]
            },
            {
              text: '协作模型',
              link: '/ai-native/operating-model/',
              collapsed: true,
              items: [
                { text: '人机协作', link: '/ai-native/operating-model/human-agent-collaboration' },
                { text: 'Trait 组队模型', link: '/ai-native/operating-model/trait-based-team' },
              ]
            },
            {
              text: '上下文系统',
              link: '/ai-native/context-system/',
              collapsed: true,
              items: [
                { text: '公私边界', link: '/ai-native/context-system/public-private-boundary' },
                { text: '记忆生命周期', link: '/ai-native/context-system/memory-lifecycle' },
              ]
            },
            {
              text: 'Agent 系统',
              link: '/ai-native/agent-system/',
              collapsed: true,
              items: [
                { text: '指令层级', link: '/ai-native/agent-system/instruction-hierarchy' },
                { text: 'Skill 目录', link: '/ai-native/agent-system/skills/' },
                { text: 'Skill Catalog', link: '/ai-native/agent-system/skills/skill-catalog' },
              ]
            },
            {
              text: '工具实践',
              link: '/ai-native/tooling/',
              collapsed: true,
              items: [
                { text: 'OpenClaw', link: '/ai-native/tooling/openclaw' },
                { text: 'Claude Code', link: '/ai-native/tooling/claude-code' },
                { text: 'Codex', link: '/ai-native/tooling/codex' },
                { text: 'Claude Auth', link: '/ai-native/tooling/claude-auth' },
                { text: 'Feishu CLI', link: '/ai-native/tooling/feishu-cli' },
              ]
            },
            {
              text: '模式',
              link: '/ai-native/patterns/',
              collapsed: true,
              items: [
                { text: '可观测 Agent 工作台', link: '/ai-native/patterns/observable-agent-workspace' },
                { text: '真源与 Bridge', link: '/ai-native/patterns/source-of-truth-and-bridges' },
              ]
            },
            {
              text: 'Playbook',
              link: '/ai-native/playbooks/',
              collapsed: true,
              items: [
                { text: '建立 Agent 工作台', link: '/ai-native/playbooks/create-agent-workspace' },
                { text: '上下文复审', link: '/ai-native/playbooks/run-context-review' },
              ]
            },
            {
              text: '治理',
              link: '/ai-native/governance/',
              collapsed: true,
              items: [
                { text: 'Agent 权限矩阵', link: '/ai-native/governance/agent-permission-matrix' },
                { text: '风险与自动化等级', link: '/ai-native/governance/risk-and-automation-levels' },
              ]
            },
            {
              text: '工作流',
              collapsed: true,
              items: [
                { text: '飞书 + OpenClaw 协作', link: '/ai-native/workflows/feishu-openclaw-collaboration' },
              ]
            },
            {
              text: '案例',
              link: '/ai-native/case-studies/',
              collapsed: true,
              items: [
                { text: '文档质量自动化', link: '/ai-native/case-studies/docs-quality-automation' },
                { text: '公私上下文拆分', link: '/ai-native/case-studies/public-private-context-split' },
                { text: 'ARTI 契约显式化', link: '/ai-native/case-studies/arti-contracts-explicit' },
              ]
            },
          ]
        }
      ],

      '/projects/': [
        {
          text: '项目',
          link: '/projects/',
          items: [
            {
              text: 'ARTI',
              link: '/projects/arti/',
              collapsed: false,
              items: [
                { text: '架构', link: '/projects/arti/architecture' },
                { text: '代码仓库', link: '/projects/arti/repositories' },
                { text: 'AI Native', link: '/projects/arti/ai-native' },
                { text: 'Source of Truth', link: '/projects/arti/source-of-truth' },
                { text: '当前 Todo & Bug', link: '/projects/arti/current-todos-and-bugs' },
                { text: '执行 Backlog', link: '/projects/arti/execution-backlog' },
                {
                  text: '契约',
                  link: '/projects/arti/contracts/',
                  collapsed: true,
                  items: [
                    { text: '通知', link: '/projects/arti/contracts/notifications' },
                    { text: 'Report Result', link: '/projects/arti/contracts/report-result' },
                    { text: 'Report Tasks', link: '/projects/arti/contracts/report-tasks' },
                    { text: '共享标识符', link: '/projects/arti/contracts/shared-identifiers' },
                    { text: '积分与结算', link: '/projects/arti/contracts/credits-and-settlement' },
                  ]
                },
                {
                  text: 'Playbook',
                  link: '/projects/arti/playbooks/',
                  collapsed: true,
                  items: [
                    { text: '跨仓变更', link: '/projects/arti/playbooks/cross-repository-change' },
                    { text: '共享 DB 变更', link: '/projects/arti/playbooks/shared-database-change' },
                    { text: '已知漂移复审', link: '/projects/arti/playbooks/known-drift-review' },
                    { text: '发布协调', link: '/projects/arti/playbooks/release-coordination' },
                  ]
                },
                {
                  text: '产品',
                  link: '/projects/arti/product/',
                  collapsed: true,
                  items: [
                    { text: '运营 PRD', link: '/projects/arti/product/operations-prd' },
                  ]
                },
                {
                  text: '决策',
                  link: '/projects/arti/decisions/',
                  collapsed: true,
                  items: [
                    { text: 'ARTI-D007 标识符漂移', link: '/projects/arti/decisions/ARTI-D007-shared-identifier-drift-review' },
                  ]
                },
              ]
            }
          ]
        }
      ],

      '/practices/': [
        {
          text: '通用实践',
          link: '/practices/',
          items: [
            { text: '文档生命周期', link: '/practices/documentation-lifecycle' },
            { text: '契约变更 SOP', link: '/practices/contract-change-sop' },
            { text: 'Handbook 内容策略', link: '/practices/handbook-content-policy' },
            { text: '知识复审', link: '/practices/knowledge-review' },
            { text: '协作文化', link: '/practices/collaboration-culture' },
          ]
        }
      ],

      '/': [
        {
          text: '导航',
          items: [
            { text: '首页', link: '/' },
            { text: 'Onboarding', link: '/ONBOARDING' },
            { text: 'Agent 入口', link: '/AGENTS' },
            { text: 'Source of Truth', link: '/SOURCE_OF_TRUTH' },
            { text: '内容路由', link: '/WORKSPACE' },
            { text: '贡献指南', link: '/CONTRIBUTING' },
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/botearn/Evolution-Handbook/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      message: 'Evolution Handbook — 团队共同维护',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/botearn/Evolution-Handbook' }
    ]
  }
})
