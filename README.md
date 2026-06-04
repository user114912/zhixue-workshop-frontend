# 智学工坊前端原型

这是“智学工坊：基于大模型的个性化学习资源生成与多智能体协同学习平台”的前端先行原型。

当前版本是无依赖静态原型，目标是先把比赛演示主流程、页面结构、组件形态和 Mock 数据跑通，后续再迁移到 React/Vite 或 Vue3 项目。

界面风格调整为参考 DeepTutor 的“工作空间”模式：左侧窄图标栏、顶部轻量工具条、中间大面积任务区。每个功能独立成页，不再把所有功能堆在同一个工作台里。

## 一、前端开发顺序

优先级从高到低：

1. 学习诊断 Chat 首页
2. 个性化资源 Viewer
3. 练习测评 Quiz
4. 学习路径 Space
5. 课程知识库 Knowledge
6. Agent 协作 Activity
7. 教师学情看板 Teacher workspace
8. AI 资源审核
9. 登录、权限、多课程切换

第一版前端的核心目标不是做完整后台，而是做出一条评委能看懂的演示主线：

```text
学生输入学习困难
→ 系统生成学生画像
→ 多 Agent 协作生成资源
→ 学生完成练习测评
→ 系统分析错因
→ 推荐下一步学习路径
→ 教师端查看班级薄弱点
```

## 二、页面清单

建议正式项目路由如下：

| 路由 | 页面 | 第一版目标 |
|---|---|---|
| `/` | 项目总览 | 展示系统定位、关键指标和入口 |
| `/demo` | 一键演示工作台 | 串起完整比赛演示流程 |
| `/student/diagnosis` | 学习诊断 | 输入学习困难，生成画像 |
| `/student/resources` | 个性化资源 | 展示讲义、题目、代码、导图、拓展阅读 |
| `/student/quiz` | 练习测评 | 答题、解析、错因分析 |
| `/student/path` | 学习路径 | 推荐下一步学习任务 |
| `/knowledge` | 课程知识库 | 课程资料、章节、知识点 |
| `/agents` | Agent 协作中心 | 展示多 Agent 状态与日志 |
| `/teacher/dashboard` | 教师看板 | 班级薄弱点、进度、资源统计 |
| `/teacher/review` | 资源审核 | 教师审核 AI 生成资源 |

当前静态原型将这些模块拆成多个独立页面，通过左侧图标栏切换，避免界面过于紧凑。

## 三、推荐正式技术栈

正式开发建议使用：

```text
React + Vite + TypeScript
Tailwind CSS + shadcn/ui
React Router
TanStack Query
Zustand
ECharts
Markmap
lucide-react
```

如果团队更熟 Vue，也可以使用：

```text
Vue3 + Vite + TypeScript
Element Plus
Pinia
Vue Router
ECharts
Markmap
```

## 四、后续迁移方式

当前原型中的数据都在 `app.js` 的 Mock 对象中。

后续接后端时，将 Mock 数据替换为接口请求即可，例如：

```ts
GET /api/student/profile
GET /api/agents/status
GET /api/resources
POST /api/quiz/submit
GET /api/learning-path
GET /api/teacher/dashboard
```

## 五、查看方式

直接打开 `index.html` 即可查看原型。
