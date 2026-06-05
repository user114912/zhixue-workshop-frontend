# 智学工坊前后端完整实施规划

> 送给 Claude Code 的执行文档
> 项目路径：`C:\Users\ZhuanZ1\Documents\教学智能体\zhixue-workshop-frontend`
> 执行前先读 CLAUDE.md 了解行为规范

---

## 一、项目初始化

当前项目已经初始化完成，不需要重新创建前端项目。

当前项目路径：

```bash
cd C:\Users\ZhuanZ1\Documents\教学智能体\zhixue-workshop-frontend
```

当前前端查看方式：

```text
直接打开 index.html
```

当前产品范围：

```text
登录 / 注册
→ 学生进入智学空间
→ 画像诊断（对话式，默认首页）
→ 学习画像（诊断结果页）
→ 个性化学习资源
→ 学习路径
→ 练习测评
→ 智能辅导
→ 学习评估
→ 课程知识库
→ Agent 协作
→ 设置
```

当前不做教师端，不做班级管理，不做资源人工审核后台。

当前前端技术形态：
- HTML + CSS + JavaScript
- Hash Router
- Mock 数据
- localStorage / 页面内状态模拟登录

后端尚未创建，后续在当前项目根目录下新增：

```text
backend/
```

后端推荐技术形态：

```text
Python 3.11
FastAPI
Pydantic v2
SQLAlchemy 2.0
Alembic
Uvicorn
PostgreSQL + pgvector
LangGraph + LangChain
SSE
```

清理默认文件：
- 不删除 `DeepTutor-main`，作为参考工程保留
- `DeepTutor-main.zip` 当前已不存在，不再作为当前目录结构的一部分记录
- `demo.html` 当前已不存在，演示登录/注册入口已合并到 `index.html`
- 不删除 `legacy`，作为旧版本备份保留
- 不继续扩展根目录旧版 `app.js`
- 前端开发优先修改 `index.html`、`shared/`、`pages/student.js`、`pages/agents.js`、`routes/`、`mock/`、`types/`
- `pages/teacher.js`、`mock/teacher.js`、教师相关路由和页面均视为历史遗留，不进入当前主流程
- 后端开发统一放入 `backend/`
- 每次创建、修改、删除文件后同步更新本文件执行进度和修改记录

---

## 二、最终目录结构

```
zhixue-workshop-frontend/
├── CLAUDE.md                         # Claude Code 行为规范
├── project_plan.md                   # 执行规划与修改记录
├── index.html                        # 当前前端主入口，含登录/注册弹窗与学生空间页面
├── recording-script.html             # 录屏脚本页，非主入口
├── README.md                         # 项目说明
├── styles.css                        # 根级样式
├── app.js                            # 旧版集中式脚本，后续不作为主开发入口
├── DeepTutor-main/                   # DeepTutor 参考工程，不直接照搬
├── legacy/                           # 旧版原型备份
│   ├── app.js
│   ├── demo.html
│   └── styles.css
├── mock/
│   ├── agents.js                     # Agent 运行状态 Mock
│   ├── index.js                      # Mock 聚合入口
│   ├── knowledge.js                  # 知识库 Mock
│   ├── path.js                       # 学习路径 Mock
│   ├── profile.js                    # 学生画像 Mock
│   ├── quiz.js                       # 测评 Mock
│   ├── report.js                     # 学习报告 Mock
│   ├── resources.js                  # 个性化资源 Mock
│   ├── system.js                     # 系统配置 Mock
│   ├── tutor.js                      # 智能辅导 Mock
│   └── teacher.js                    # 历史遗留 Mock，当前主流程不使用
├── pages/
│   ├── student.js                    # 学生端学习闭环
│   ├── agents.js                     # Agent 协作、运行概览、执行时间线与设置页账号信息
│   └── teacher.js                    # 历史遗留页面，当前主流程不使用
├── routes/
│   └── route-config.js               # Hash 路由配置，workspace 暴露学生页面与 Agent 协作页
├── shared/
│   ├── api.js                        # Mock API 层，后续替换真实接口
│   ├── router.js                     # Hash Router 运行逻辑
│   ├── state.js                      # 全局状态
│   └── styles.css                    # 共享样式
├── types/
│   ├── agent.ts
│   ├── index.ts
│   ├── knowledge.ts
│   ├── path.ts
│   ├── profile.ts
│   ├── quiz.ts
│   ├── resource.ts
│   └── teacher.ts                    # 历史遗留类型，当前主流程不使用
└── backend/                          # 后续新增 FastAPI 后端
    ├── app/
    │   ├── main.py                   # FastAPI 入口
    │   ├── config.py                 # 配置读取
    │   ├── api/
    │   │   ├── auth.py               # 登录 / 注册接口
    │   │   ├── profile.py            # 学生画像接口
    │   │   ├── resources.py          # 学习资源接口
    │   │   ├── quiz.py               # 测评接口
    │   │   ├── path.py               # 学习路径接口
    │   │   ├── tutor.py              # 智能辅导接口
    │   │   ├── knowledge.py          # 知识库接口
    │   │   ├── agents.py             # Agent 运行接口
    │   │   └── settings.py           # 学生设置接口
    │   ├── agents/
    │   │   ├── graph.py              # LangGraph 工作流
    │   │   ├── state.py              # Agent 状态结构
    │   │   ├── profile_agent.py      # 画像诊断 Agent
    │   │   ├── retrieval_agent.py    # 知识检索 Agent
    │   │   ├── resource_planner_agent.py
    │   │   ├── document_agent.py     # 讲义生成 Agent
    │   │   ├── quiz_agent.py         # 题库生成 Agent
    │   │   ├── mindmap_agent.py      # 思维导图 Agent
    │   │   ├── code_agent.py         # 代码案例 Agent
    │   │   ├── path_agent.py         # 路径规划 Agent
    │   │   └── safety_agent.py       # 自动安全校验 Agent
    │   ├── services/
    │   │   ├── auth_service.py       # 用户登录注册业务
    │   │   ├── llm_service.py        # 统一模型调用
    │   │   ├── embedding_service.py  # Embedding 服务
    │   │   ├── rag_service.py        # RAG 检索服务
    │   │   ├── resource_service.py   # 资源生成业务
    │   │   ├── quiz_service.py       # 测评业务
    │   │   ├── profile_service.py    # 画像业务
    │   │   ├── task_service.py       # 任务进度业务
    │   │   └── safety_service.py     # 自动安全校验业务
    │   ├── db/
    │   │   ├── session.py            # 数据库连接
    │   │   ├── models.py             # SQLAlchemy 模型
    │   │   └── migrations/           # Alembic 迁移
    │   ├── schemas/
    │   │   ├── auth.py
    │   │   ├── profile.py
    │   │   ├── resource.py
    │   │   ├── quiz.py
    │   │   ├── path.py
    │   │   ├── knowledge.py
    │   │   └── agent.py
    │   ├── events/
    │   │   ├── broadcaster.py        # SSE 广播
    │   │   └── task_stream.py        # 任务事件流
    │   └── tools/
    │       ├── document_loader.py    # 文档解析
    │       ├── ppt_generator.py      # PPT 生成
    │       ├── mindmap_generator.py  # 导图生成
    │       └── code_checker.py       # 代码检查
    ├── uploads/
    ├── generated/
    ├── tests/
    ├── requirements.txt
    └── docker-compose.yml
```

---

## 三、学生端页面的完整规格

### 页面 0 · 登录 / 注册（landing + entryModal）

```
┌─────────────────────────────────────────────┐
│  智学工坊                                    │
│  OpenHLG · 个性化学习资源生成与多智能体学习系统 │
│                                             │
│  对话式学习画像 / 多智能体资源生成 / 学习路径   │
│                                             │
│  [注册] [登录]                               │
│                                             │
│  登录弹窗：                                   │
│  学号 [ 请输入学号_________ ]                 │
│  密码 [ 请输入密码_________ ]                 │
│  [取消] [登录]                                │
│  还没有账号？去注册  |  忘记密码？             │
│                                             │
│  注册弹窗：                                   │
│  学校名称 [ 请输入学校名称____ ]               │
│  姓名 [ 请输入真实姓名_______ ]               │
│  学号 [ 请输入学号__________ ]                │
│  密码 [ 请输入密码(至少6位)__ ]               │
│  确认密码 [ 请再次输入密码____ ]              │
│  [取消] [注册并进入]                          │
│  已有账号？去登录                             │
└─────────────────────────────────────────────┘
```

**现有代码位置：**
- `index.html` 中的 `landingPage`
- `index.html` 中的 `entryModal`（含登录/注册/忘记密码三个表单态）
- 登录后显示 `appShell`
- 登录后左侧 `rail` 导航支持展开/折叠，偏好写入 `localStorage` 键 `zhixue_rail_expanded`

**交互：**
- 点击注册 / 登录打开对应表单弹窗
- 注册：学校名称 + 学号 + 真实姓名 + 密码 + 确认密码，信息存入 localStorage
- 登录：学号 + 密码，校验 localStorage 中的用户数据
- 忘记密码：验证学号 + 姓名后重置密码，自动登录
- 预置演示账号：学号 2024001，密码 123456
- 用户数据存入 `localStorage` 键 `zhixue_users`
- 登录态对象为 `{ studentId, realName, school }`，顶部 `userBadge` 显示“真实姓名 · 学号”
- 登录后进入 `workspace`，默认进入画像诊断页；主导航显示 diagnosis、profile、resources、path、quiz、tutor、report、knowledge、agents、settings

---

### 页面 1 · 学习画像（profile）

```
┌─────────────────────────────────────────────┐
│  学习画像                                    │
│  你好，我是智学工坊，今天你想学点什么呢？       │
│                                             │
│  [描述你的基础、目标和困难...]                │
│  [开始诊断]                                  │
│                                             │
│  学生画像 / 知识点掌握度 / 画像更新记录        │
│  [生成个性化资源] [开始练习测评]              │
└─────────────────────────────────────────────┘
```

**视觉要点：**
- 当前学习诊断已并入学习画像页
- 学生登录后默认进入对话式画像诊断页，通过 6 轮问答构建学习画像
- 诊断完成后可跳转学习画像结果页，查看完整画像、知识点掌握度和更新记录
- 学习画像页含"继续对话更新画像"入口，支持画像持续更新

**后端数据来源：**

```text
POST /api/profile/diagnose
GET  /api/profile
GET  /api/profile/versions
```

---

### 页面 2 · 个性化资源（resources）

```
┌─────────────────────────────────────────────┐
│  学习资源                                    │
│                                             │
│  [讲义] [练习] [代码] [导图] [阅读] [视频]    │
│                                             │
│  资源正文                                    │
│  来源：第 4 章 循环结构 / 实验 4-2            │
│  自动校验：通过                               │
└─────────────────────────────────────────────┘
```

**资源类型：**
- 讲义
- 题目
- 代码案例
- 思维导图
- 拓展阅读
- 视频 / 动画
- PPT
- 实践项目材料

**后端数据来源：**

```text
GET /api/resources?run_id=xxx
```

**资源字段要求：**

```text
resource_id
run_id
resource_type
title
content
source_refs
generated_by
safety_status
```

---

### 页面 3 · 学习路径（path）

```
┌─────────────────────────────────────────────┐
│  学习路径                                    │
│                                             │
│  01 复习 for / while 基础语法     已完成      │
│  02 画循环嵌套执行表              学习中      │
│  03 练习函数参数与返回值          待开始      │
│  04 完成综合代码题                待开始      │
└─────────────────────────────────────────────┘
```

**后端数据来源：**

```text
GET  /api/path
POST /api/path/replan
```

---

### 页面 4 · 练习测评（quiz）

```
┌─────────────────────────────────────────────┐
│  练习测评                                    │
│                                             │
│  题目：range(1, 6) 的循环次数是？             │
│  A. 4  B. 5  C. 6  D. 不确定                 │
│                                             │
│  [提交答案]                                  │
│  错因类型：边界条件错误                       │
│  解析：range 左闭右开，因此执行 5 次           │
└─────────────────────────────────────────────┘
```

**后端数据来源：**

```text
GET  /api/quiz/questions
POST /api/quiz/submit
GET  /api/quiz/attempts
```

**测评字段要求：**

```text
question_id
knowledge_point
mistake_type
analysis
score
```

---

### 页面 5 · 智能辅导（tutor）

```
┌─────────────────────────────────────────────┐
│  智能辅导                                    │
│                                             │
│  左侧：历史问题                              │
│  右侧：AI 解答、知识点、来源章节、继续提问      │
│                                             │
│  支持文字、图解、视频讲解的展示位              │
└─────────────────────────────────────────────┘
```

**后端数据来源：**

```text
POST /api/tutor/chat
GET  /api/tutor/sessions
```

---

### 页面 6 · 学习评估（report）

```
┌─────────────────────────────────────────────┐
│  学习评估                                    │
│                                             │
│  本轮学习完成度：80%                          │
│  测评结果 → 错因分析 → 画像更新 → 路径调整      │
│  主要错因：边界条件、循环次数推导               │
│  画像更新：资源偏好强化为代码示例 + 分层练习     │
│  下一步建议：函数参数与返回值专项练习           │
└─────────────────────────────────────────────┘
```

**核心要求：**
- 报告能讲清学生个人学习闭环
- 显式展示“测评 → 画像更新 → 路径调整”
- 不再出现教师建议、班级分析、人工审核入口

---

### 页面 7 · 课程知识库（knowledge）

```
┌─────────────────────────────────────────────┐
│  课程知识库                                  │
│                                             │
│  导入课程资料                                │
│  章节列表 / 知识点 / 检索命中片段              │
│                                             │
│  系统用于 RAG 检索和资源生成                  │
└─────────────────────────────────────────────┘
```

**后端数据来源：**

```text
POST /api/knowledge/upload
GET  /api/knowledge/files
POST /api/knowledge/index
GET  /api/knowledge/search
```

---

### 页面 8 · 设置（settings）

```
┌─────────────────────────────────────────────┐
│  设置                                        │
│                                             │
│  账号信息                                    │
│  默认模型                                    │
│  资源生成偏好                                │
│  通知与进度提醒                              │
└─────────────────────────────────────────────┘
```

**后端数据来源：**

```text
GET  /api/settings
POST /api/settings
```

---

## 四、后端技术架构

### 1. 总体判断

本项目不按简单 Demo 或单接口聊天工具设计，而按“有数据底座的多智能体学生学习系统”规划。

核心链路：

```text
学生登录 / 注册
→ 学生自然语言诊断
→ 动态学生画像
→ 课程知识库检索
→ 多 Agent 协同生成个性化资源
→ 练习测评与错因分析
→ 学习路径动态调整
→ 学生个人报告与过程可追踪
```

技术选型必须满足：

- 学生画像长期保存和动态更新
- 课程知识库支持检索
- Agent 运行过程可记录、可追踪
- 资源生成支持进度追踪
- 生成资源带来源引用
- 学生端能直接理解自己的学习闭环

### 2. 后端职责

- 提供登录 / 注册 API
- 提供学生端 API
- 管理学生画像
- 管理课程知识库
- 调用大模型
- 编排多智能体流程
- 生成讲义、题目、导图、代码案例、拓展阅读、PPT / 视频脚本
- 记录 Agent 运行过程
- 提供 SSE 进度流
- 自动完成事实、引用和安全校验

### 3. 后端目录职责

| 目录 | 职责 |
|---|---|
| `api/` | 只处理 HTTP 请求和响应 |
| `agents/` | 只处理 Agent 节点和 LangGraph 流程 |
| `services/` | 处理业务逻辑 |
| `db/` | 数据库模型、连接、迁移 |
| `schemas/` | Pydantic 请求和响应结构 |
| `events/` | SSE、任务进度、运行日志推送 |
| `tools/` | 文档解析、PPT、导图、代码检查等工具 |

---

## 五、数据库设计

不建议使用 SQLite。

推荐直接使用：

```text
PostgreSQL + pgvector
```

原因：

| 需求 | PostgreSQL 价值 |
|---|---|
| 学生账号 | 适合关系型存储 |
| 学生画像 | JSONB 可存动态画像结构 |
| 学习记录 | 适合关系型查询 |
| 测评记录 | 方便统计和趋势分析 |
| Agent 日志 | 可按 run_id / step_id 检索 |
| 课程知识库 | 文件、章节、知识点结构清晰 |
| 向量检索 | pgvector 可直接存 embedding |
| 后续扩展 | 比 SQLite 稳定 |

核心表：

```text
users
courses
course_files
knowledge_chunks
student_profiles
profile_versions
agent_runs
agent_steps
resource_tasks
learning_resources
quiz_questions
quiz_attempts
learning_paths
learning_path_steps
tutor_sessions
safety_checks
user_settings
```

### 1. users

字段建议：

```text
id
nickname
student_no
password_hash
created_at
updated_at
```

### 2. student_profiles

字段建议：

```text
id
user_id
course_id
profile_json
mastery_json
updated_reason
created_at
updated_at
```

`profile_json` 使用 PostgreSQL JSONB：

```json
{
  "major": "计算机科学与技术",
  "course": "Python程序设计",
  "knowledge_base": "基础一般",
  "weak_points": ["循环嵌套", "函数返回值"],
  "cognitive_style": "案例驱动",
  "resource_preference": ["代码案例", "思维导图"],
  "mistake_pattern": ["边界条件错误", "执行顺序混乱"],
  "learning_goal": "期末复习"
}
```

### 3. knowledge_chunks

字段建议：

```text
id
course_id
file_id
chapter
knowledge_point
content
embedding
source_page
source_title
created_at
```

其中 `embedding` 使用 pgvector。

### 4. agent_runs

字段建议：

```text
id
user_id
course_id
run_type
status
input_json
output_json
started_at
finished_at
error_message
```

### 5. agent_steps

字段建议：

```text
id
run_id
agent_name
step_order
status
input_summary
output_summary
input_json
output_json
started_at
finished_at
duration_ms
error_message
```

### 6. learning_resources

字段建议：

```text
id
user_id
course_id
run_id
resource_type
title
content
content_json
knowledge_points
difficulty
source_refs
generated_by
safety_status
created_at
```

### 7. quiz_attempts

字段建议：

```text
id
user_id
question_id
answer
is_correct
score
mistake_type
analysis
created_at
```

### 8. safety_checks

字段建议：

```text
id
resource_id
risk_level
fact_check_result
sensitive_check_result
source_refs
safety_status
check_comment
created_at
```

---

## 六、Agent 工作流

### 1. 不建议完全串行

Agent 流程中有些步骤必须串行，因为后一步依赖前一步结果。

例如：

```text
学生输入
→ 画像诊断
→ 知识检索
→ 资源规划
```

这些步骤不能乱序。

但资源生成阶段不应该全部串行，否则响应时间会很长。

### 2. 推荐流程：主流程串行，资源生成并行

```text
1. 画像诊断 Agent
   ↓
2. 知识检索 Agent
   ↓
3. 资源规划 Agent
   ↓
4. 多资源生成 Agent 并行
   ├── 讲义生成 Agent
   ├── 题库生成 Agent
   ├── 思维导图 Agent
   ├── 代码案例 Agent
   ├── 拓展阅读 Agent
   └── PPT / 视频脚本 Agent
   ↓
5. 自动安全校验 Agent
   ↓
6. 路径规划 Agent
   ↓
7. 学习评估 / 画像更新 Agent
```

原则：

```text
关键决策串行
资源生产并行
最终汇总串行
```

### 3. Agent 列表建议

第一版至少实现 7 个 Agent：

| Agent | 职责 |
|---|---|
| 画像诊断 Agent | 从自然语言对话中抽取学生画像 |
| 知识检索 Agent | 从课程知识库中检索相关内容 |
| 资源规划 Agent | 决定生成哪些学习资源 |
| 讲义生成 Agent | 生成课程讲解文档 |
| 题库生成 Agent | 生成选择题、填空题、代码题 |
| 路径规划 Agent | 生成学习步骤和资源推送 |
| 自动安全校验 Agent | 检查事实、引用和违规内容 |

第二阶段可扩展：

| Agent | 职责 |
|---|---|
| 思维导图 Agent | 生成 Markmap / Mermaid 结构 |
| PPT 生成 Agent | 生成 PPT 结构或文件 |
| 视频脚本 Agent | 生成短视频讲解脚本 |
| 代码实操 Agent | 生成项目案例和示例代码 |
| 测评分析 Agent | 分析答题结果和错因 |
| 画像更新 Agent | 根据学习行为增量更新画像 |

---

## 七、RAG 与知识库

推荐组件：

```text
PostgreSQL + pgvector
BGE-M3 / bge-large-zh
PyMuPDF
python-docx
python-pptx
pypdf
```

知识库流程：

```text
上传课程资料
→ 文件解析
→ 文本清洗
→ 文档分块
→ Embedding 向量化
→ 写入 pgvector
→ Agent 检索
→ 带引用生成资源
```

第一门课程建议固定为：

```text
Python 程序设计
```

课程资料建议包含：

- 课程大纲
- 章节课件
- 实验指导
- 题库
- 示例代码
- 常见错误库
- 拓展阅读

前端 Mock 需要逐步补齐：

```text
knowledge.documents[]
knowledge.searchHits[]
resources[].source_refs
resources[].safety_status
resources[].generated_by
```

---

## 八、API 层

### 当前前端 Mock 接口

当前接口统一位于：

```text
shared/api.js
```

当前数据来源：

```text
mock/
```

历史遗留的 `/api/teacher/*` Mock 接口当前不进入主流程，后续清理或隐藏。

### 后端正式接口

#### 1. 登录注册

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

#### 2. 学生画像

```text
POST /api/profile/diagnose
GET  /api/profile
GET  /api/profile/versions
```

#### 3. 课程知识库

```text
POST /api/knowledge/upload
GET  /api/knowledge/files
POST /api/knowledge/index
GET  /api/knowledge/search
```

#### 4. Agent 运行

```text
POST /api/agents/runs
GET  /api/agents/runs/{run_id}
GET  /api/agents/runs/{run_id}/steps
GET  /api/agents/runs/{run_id}/events
```

#### 5. 学习资源

```text
POST /api/resources/generate
GET  /api/resources
GET  /api/resources/{resource_id}
```

#### 6. 练习测评

```text
GET  /api/quiz/questions
POST /api/quiz/submit
GET  /api/quiz/attempts
```

#### 7. 学习路径

```text
GET  /api/path
POST /api/path/replan
```

#### 8. 智能辅导

```text
POST /api/tutor/chat
GET  /api/tutor/sessions
```

#### 9. 设置

```text
GET  /api/settings
POST /api/settings
```

### SSE 流式

不要让前端等待一个长接口。

错误方式：

```text
POST /api/resources/generate
→ 等几十秒
→ 一次性返回全部结果
```

正确方式：

```text
POST /api/agents/runs
→ 立即返回 run_id
→ 后端异步执行 Agent 工作流
→ 前端订阅 SSE 进度
→ 每完成一个资源就展示一个资源
```

任务队列方案：

```text
第一阶段：FastAPI BackgroundTasks
第二阶段：Redis + Celery 或 Redis + Dramatiq
```

---

## 九、设计系统

## 十、主题系统

### 主题色值
- 深空（默认）：--bg-1: #060A14  --t1: #F0F0F5  --accent: #0A84FF
- 晨曦（暖色提亮）：--bg-1: #1A2332  --t1: #FFFFFF  --accent: #5EACFF
- 白昼（亮色）：--bg-1: #E8EDF2  --t1: #1D1D1F  --accent: #007AFF

### 切换机制
- 主题切换器放在顶部工具栏右侧
- 选中主题存 localStorage("theme")
- 通过覆盖 CSS 变量实现

## 十一、布局要求

- 基础字号：16px
- 主内容 max-width: 1280px
- 学生任务页保持中间任务区清晰
- 资源、辅导、报告页要方便反复查看
- 卡片阴影：0 4px 20px rgba(0,0,0,0.18)
- 不做空洞 hero，不做大面积营销文案
（shared/styles.css）

### CSS 变量

```css
:root {
  --bg-1: #060A14;
  --bg-2: #0C1220;
  --accent: #0A84FF;
  --accent-soft: rgba(10,132,255,0.12);
  --green: #30D158;
  --orange: #FF9F0A;
  --red: #FF453A;
  --t1: #F0F0F5;
  --t2: #8E8E93;
  --t3: #48484A;
  --panel: rgba(255,255,255,0.05);
  --panel-border: rgba(255,255,255,0.09);
  --nav-h: 56px;
  --r-sm: 8px;
  --r-md: 10px;
}
```

---

## 十二、全局状态（shared/state.js）

```javascript
window.ZhixueState = {
  // 当前选中的资源
  activeResource: 'lecture',

  // 当前登录用户，登录后由 index.html 写入
  // 形态：{ studentId, realName, school, role: 'workspace' }
  currentUser: null,

  // 当前题目索引
  currentQuizIndex: 0,

  diffLabels: {},
  typeLabels: {},
  pathStatusIcons: {},
  roleLabels: {},
  updatePreviewNotice: function (text) {},
  showModal: function (id) {},
  hideModal: function (id) {}
};
```

当前 `workspace` 暴露的学生页面：

```text
profile
resources
path
quiz
tutor
report
knowledge
agents
settings
```

后续接后端后，前端不直接写 fetch，统一通过 `shared/api.js` 适配真实接口。

---

## 十三、实施顺序

```
Phase 1 — 文档校准
Step 1  → 创建 CLAUDE.md（只放行为规范）
Step 2  → 重写 project_plan.md（严格参考用户提供格式）
Step 3  → 扫描当前文件结构并写入最终目录结构
Step 4  → 参考技术架构文档，将后端架构加入 project_plan.md
Step 5  → 移除 project_plan.md 中教师端主流程规划

Phase 2 — 编码检查
Step 6  → 检查 index.html charset
Step 7  → 检查 shared/pages/mock 中文是否乱码
Step 8  → 统一保存为 UTF-8

Phase 3 — 学生端登录与工作区
Step 9  → 校准 landingPage 登录/注册入口
Step 10 → 校准 entryModal 登录/注册弹窗
Step 11 → 校准登录后进入 workspace 的默认路由
Step 12 → 隐藏或清理教师端旧导航入口

Phase 4 — 学生学习闭环
Step 13 → 校准 profile 页面
Step 14 → 校准 resources 页面
Step 15 → 校准 path 页面
Step 16 → 校准 quiz 页面
Step 17 → 校准 tutor 页面
Step 18 → 校准 report 页面
Step 19 → 校准 knowledge 页面
Step 20 → 校准 settings 页面

Phase 5 — 前端 Agent 协作
Step 21 → mock/agents.js 增加 run_id、step_id、status、duration、output
Step 22 → pages/agents.js 增加任务时间线
Step 23 → shared/api.js 增加 SSE Mock 形态

Phase 6 — 前端资源与知识库
Step 24 → mock/resources.js 增加 source_refs、safety_status、generated_by
Step 25 → resources 页面展示来源引用和自动校验状态
Step 26 → mock/knowledge.js 对齐课程章节、知识点、文档片段
Step 27 → knowledge 页面展示检索命中

Phase 7 — 前端测评与报告
Step 28 → mock/quiz.js 增加 mistake_type、knowledge_point、analysis
Step 29 → quiz 页面提交后展示错因
Step 30 → mock/report.js 增加画像更新、路径推荐、个人学习摘要
Step 31 → report 页面展示闭环证据

Phase 8 — 后端基础
Step 32 → 创建 backend 目录
Step 33 → 创建 FastAPI 项目骨架
Step 34 → 配置 Pydantic v2、SQLAlchemy 2.0、Alembic
Step 35 → 配置 PostgreSQL + pgvector
Step 36 → 建核心表模型和迁移
Step 37 → 写 /health 接口

Phase 9 — 后端登录与学生画像
Step 38 → 实现 AuthService
Step 39 → 实现注册 / 登录 / 当前用户接口
Step 40 → 封装 LLMService
Step 41 → 实现画像诊断 Agent
Step 42 → 设计画像 JSON Schema
Step 43 → 存储 student_profiles
Step 44 → 存储 profile_versions
Step 45 → 前端接入画像接口

Phase 10 — 后端 Agent 工作流
Step 46 → 建 LangGraph 工作流
Step 47 → 实现 3-Agent 串行流程
Step 48 → 存储 agent_runs
Step 49 → 存储 agent_steps
Step 50 → 实现 SSE 进度推送

Phase 11 — 后端资源生成
Step 51 → 讲义生成
Step 52 → 题库生成
Step 53 → 思维导图生成
Step 54 → 代码案例生成
Step 55 → 拓展阅读生成
Step 56 → PPT / 视频脚本生成
Step 57 → 自动安全校验

Phase 12 — 后端知识库与 RAG
Step 58 → 上传课程文件
Step 59 → 解析 PDF / DOCX / PPTX
Step 60 → 文档分块
Step 61 → 生成 embedding
Step 62 → 写入 pgvector
Step 63 → 实现检索接口
Step 64 → 资源生成加入引用来源

Phase 13 — 后端测评与路径闭环
Step 65 → 生成练习题
Step 66 → 提交答案
Step 67 → 错因分析
Step 68 → 更新学生画像
Step 69 → 重新规划学习路径

Phase 14 — 整合
Step 70 → 验证所有学生端 hash 路由
Step 71 → 从登录/注册跑到学习评估
Step 72 → 检查 Agent 中心备用页
Step 73 → 前后端联调
Step 74 → 更新执行进度和修改记录
```

每个前端 Step 完成后打开 `index.html` 验证无明显报错。

每个后端 Step 完成后至少验证：

```text
uvicorn app.main:app --reload
GET /health
```

---

## 十四、注意事项

1. **当前不新建 React / Vite 项目** — 保持现有静态原型
2. **DeepTutor-main 只做参考** — 不直接照搬全部结构
3. **不要继续扩展旧 app.js** — 新功能优先写入 index.html/shared/pages/routes/mock
4. **当前不做教师端** — 教师看板、班级学情、教学建议、资源人工审核均不进入主流程
5. **历史遗留代码先隐藏再清理** — `teacher.js`、`mock/teacher.js`、教师路由暂不作为当前功能
6. **后端不使用 SQLite** — 直接 PostgreSQL + pgvector
7. **Agent 主流程串行，资源生成阶段并行**
8. **所有 Agent 运行过程必须落库**
9. **所有长任务必须有进度展示**
10. **所有生成资源尽量带引用来源**
11. **前端先保留现有结构，不急着迁移框架**
12. **后端先做登录/画像，再做完整多 Agent**
13. **先跑通单课程《Python 程序设计》**
14. **每个功能都要能对应赛题要求和评分点**
15. **project_plan.md 每次创建/修改/删除文件后同步更新记录**
16. **永远不要用 Gradio**

---

## 十五、执行进度

| Step | 任务 | 状态 | 完成时间 |
|------|------|------|----------|
| Step 1 | 创建 CLAUDE.md（只放行为规范） | ✅ 完成 | 2026-06-05 |
| Step 2 | 重写 project_plan.md（严格参考用户提供格式） | ✅ 完成 | 2026-06-05 |
| Step 3 | 扫描当前文件结构并写入最终目录结构 | ✅ 完成 | 2026-06-05 |
| Step 4 | 参考技术架构文档，将后端架构加入 project_plan.md | ✅ 完成 | 2026-06-05 |
| Step 5 | 移除 project_plan.md 中教师端主流程规划 | ✅ 完成 | 2026-06-05 |
| Step 6 | 检查 index.html charset | ✅ 完成 | 2026-06-05 |
| Step 7 | 检查 shared/pages/mock 中文是否乱码 | ⏳ 待执行 | - |
| Step 8 | 统一保存为 UTF-8 | ⏳ 待执行 | - |
| Step 9 | 校准 landingPage 登录/注册入口 | ✅ 完成 | 2026-06-05 |
| Step 10 | 校准 entryModal 登录/注册弹窗 | ✅ 完成 | 2026-06-05 |
| Step 11 | 校准登录后进入 workspace 的默认路由 | ✅ 完成 | 2026-06-05 |
| Step 12 | 隐藏或清理教师端旧导航入口 | ✅ 完成 | 2026-06-05 |
| Step 13 | 校准 profile 页面 | ✅ 基本完成 | 2026-06-05 |
| Step 14 | 校准 resources 页面 | ✅ 基本完成 | 2026-06-05 |
| Step 15 | 校准 path 页面 | ✅ 基本完成 | 2026-06-05 |
| Step 16 | 校准 quiz 页面 | ✅ 基本完成 | 2026-06-05 |
| Step 17 | 校准 tutor 页面 | ✅ 基本完成 | 2026-06-05 |
| Step 18 | 校准 report 页面 | ✅ 基本完成 | 2026-06-05 |
| Step 19 | 校准 knowledge 页面 | ✅ 基本完成 | 2026-06-05 |
| Step 20 | 校准 settings 页面 | ✅ 基本完成 | 2026-06-05 |
| Step 21 | mock/agents.js 增加 Agent run 字段 | ✅ 完成 | 2026-06-05 |
| Step 22 | pages/agents.js 增加任务时间线 | ✅ 完成 | 2026-06-05 |
| Step 23 | shared/api.js 增加 SSE Mock 形态 | ✅ 完成 | 2026-06-05 |
| Step 24 | mock/resources.js 增加资源来源和安全字段 | ⏳ 待执行 | - |
| Step 25 | resources 页面展示来源引用和自动校验状态 | ⏳ 待执行 | - |
| Step 26 | mock/knowledge.js 对齐知识库字段 | ⏳ 待执行 | - |
| Step 27 | knowledge 页面展示检索命中 | ⏳ 待执行 | - |
| Step 28 | mock/quiz.js 增加错因字段 | ⏳ 待执行 | - |
| Step 29 | quiz 页面展示错因 | ⚠️ 部分完成 | - |
| Step 30 | mock/report.js 增加画像更新和路径推荐 | ✅ 基本完成 | 2026-06-05 |
| Step 31 | report 页面展示闭环证据 | ⚠️ 部分完成 | - |
| Step 32 | 创建 backend 目录 | ⏳ 待执行 | - |
| Step 33 | 创建 FastAPI 项目骨架 | ⏳ 待执行 | - |
| Step 34 | 配置 Pydantic v2、SQLAlchemy 2.0、Alembic | ⏳ 待执行 | - |
| Step 35 | 配置 PostgreSQL + pgvector | ⏳ 待执行 | - |
| Step 36 | 建核心表模型和迁移 | ⏳ 待执行 | - |
| Step 37 | 写 /health 接口 | ⏳ 待执行 | - |
| Step 38 | 实现 AuthService | ⏳ 待执行 | - |
| Step 39 | 实现注册 / 登录 / 当前用户接口 | ⏳ 待执行 | - |
| Step 40 | 封装 LLMService | ⏳ 待执行 | - |
| Step 41 | 实现画像诊断 Agent | ⏳ 待执行 | - |
| Step 42 | 设计画像 JSON Schema | ⏳ 待执行 | - |
| Step 43 | 存储 student_profiles | ⏳ 待执行 | - |
| Step 44 | 存储 profile_versions | ⏳ 待执行 | - |
| Step 45 | 前端接入画像接口 | ⏳ 待执行 | - |
| Step 46 | 建 LangGraph 工作流 | ⏳ 待执行 | - |
| Step 47 | 实现 3-Agent 串行流程 | ⏳ 待执行 | - |
| Step 48 | 存储 agent_runs | ⏳ 待执行 | - |
| Step 49 | 存储 agent_steps | ⏳ 待执行 | - |
| Step 50 | 实现 SSE 进度推送 | ⏳ 待执行 | - |
| Step 51 | 讲义生成 | ⏳ 待执行 | - |
| Step 52 | 题库生成 | ⏳ 待执行 | - |
| Step 53 | 思维导图生成 | ⏳ 待执行 | - |
| Step 54 | 代码案例生成 | ⏳ 待执行 | - |
| Step 55 | 拓展阅读生成 | ⏳ 待执行 | - |
| Step 56 | PPT / 视频脚本生成 | ⏳ 待执行 | - |
| Step 57 | 自动安全校验 | ⏳ 待执行 | - |
| Step 58 | 上传课程文件 | ⏳ 待执行 | - |
| Step 59 | 解析 PDF / DOCX / PPTX | ⏳ 待执行 | - |
| Step 60 | 文档分块 | ⏳ 待执行 | - |
| Step 61 | 生成 embedding | ⏳ 待执行 | - |
| Step 62 | 写入 pgvector | ⏳ 待执行 | - |
| Step 63 | 实现检索接口 | ⏳ 待执行 | - |
| Step 64 | 资源生成加入引用来源 | ⏳ 待执行 | - |
| Step 65 | 生成练习题 | ⏳ 待执行 | - |
| Step 66 | 提交答案 | ⏳ 待执行 | - |
| Step 67 | 错因分析 | ⏳ 待执行 | - |
| Step 68 | 更新学生画像 | ⏳ 待执行 | - |
| Step 69 | 重新规划学习路径 | ⏳ 待执行 | - |
| Step 70 | 验证所有学生端 hash 路由 | ⏳ 待执行 | - |
| Step 71 | 从登录/注册跑到学习评估 | ⏳ 待执行 | - |
| Step 72 | 检查 Agent 中心备用页 | ⏳ 待执行 | - |
| Step 73 | 前后端联调 | ⏳ 待执行 | - |
| Step 74 | 更新执行进度和修改记录 | ⏳ 待执行 | - |

**边缘情况修复记录：**
- 2026-06-05：修复 CLAUDE.md 内容过具体的问题，只保留行为规范
- 2026-06-05：修复 project_plan.md 格式偏离参考文件的问题，按参考章节重写
- 2026-06-05：删除多余的技术架构指导文档，避免生成无用僵尸文档
- 2026-06-05：根据《智学工坊技术架构与 Agent 优化指导》将后端架构、数据库、Agent、RAG、SSE、后端实施阶段加入 project_plan.md
- 2026-06-05：根据当前产品范围移除教师端主流程规划，改为学生登录/注册后直接使用

**功能变更记录：**
- 2026-06-05：新增 CLAUDE.md
- 2026-06-05：新增 project_plan.md
- 2026-06-05：project_plan.md 从“前端完整实施规划”升级为“前后端完整实施规划”
- 2026-06-05：project_plan.md 调整为“学生端单人学习空间”主线，不再规划教师端功能
- 2026-06-05：演示登录/注册入口合并到 index.html 的 landingPage + entryModal；demo.html 当前已不存在，不再作为主入口
- 2026-06-05：index.html 登录/注册弹窗支持注册、登录、忘记密码三态；注册字段为学校名称、姓名、学号、密码、确认密码；登录字段为学号、密码
- 2026-06-05：index.html 左侧主导航改为可展开/折叠 rail，偏好保存到 localStorage（键 zhixue_rail_expanded）

**测试修复记录：**
- 2026-06-05：本次仅修改 Markdown 文档，未运行页面测试
- 2026-06-05：已确认 index.html 存在 `<meta charset="UTF-8" />`
- 2026-06-05：已核对当前主导航暴露 profile、resources、path、quiz、tutor、report、knowledge、agents、settings
- 2026-06-05：已核对 index.html 中 105 个 HTML ID、114 个 getElementById 引用和 inline 脚本语法，当前未发现缺失 ID

**目录结构调整记录：**
- 2026-06-05：在 zhixue-workshop-frontend 根目录保留 CLAUDE.md、project_plan.md、README.md 三个 Markdown 文件
- 2026-06-05：在 project_plan.md 中规划新增 backend/ 后端目录，但尚未创建真实后端文件
- 2026-06-05：在 project_plan.md 中标注 teacher.js、mock/teacher.js、teacher.ts 为历史遗留，不进入当前主流程
- 2026-06-05：根据当前工作区状态，project_plan.md 不再把 demo.html 和 DeepTutor-main.zip 写入当前目录结构

**静态原型维护记录：**
- 2026-06-05：确认当前主开发结构为 index.html + shared/ + pages/student.js + pages/agents.js + routes/ + mock/ + types/
- 2026-06-05：确认后端正式开发前，前端继续保留现有 HTML + CSS + JavaScript + Hash Router 结构
- 2026-06-05：index.html 保留读取 zhixue_demo_entry_user 的兼容入口逻辑；当前主登录/注册流程以 entryModal 和 zhixue_users 为准

**Phase 5 实施记录（Agent 运行链路）：**
- 2026-06-05：Step 21 — mock/agents.js 重构：sessionId→run_id，新增 run_type/user_id/course_id/input_json/output_json/completed_at/error_message；新增 ZHIXUE_MOCK.agentSteps（15 个步骤详情，含 step_id/status/duration_ms/input_summary/output_summary）；新增 ZHIXUE_MOCK.agentEvents（39 个事件，用于 SSE 模拟）
- 2026-06-05：Step 21b — types/agent.ts 同步更新：新增 AgentStep/AgentStepDef/RunType/RunStatus/StepStatus 类型，新增 AgentRunCallbacks 接口，AgentRun.sessionId 改为 run_id
- 2026-06-05：Step 22 — pages/agents.js 新增 renderTimeline() 函数，展示 Agent 执行时间线（进度条 + 步骤节点 + 状态指示）；renderAgents() 增加运行元信息面板；shared/styles.css 新增时间线 CSS（.tl-track/.tl-node/.tl-dot）；index.html agents 区域增加时间线容器；routes/route-config.js agents 路由增加 renderTimeline 调用
- 2026-06-05：Step 23 — shared/api.js 新增 createAgentRun()（模拟触发运行）、getAgentSteps()（获取步骤列表）、subscribeAgentRun()（SSE 模拟订阅，按 400ms 间隔逐事件推送，支持 onStepStart/onStepProgress/onStepComplete/onAgentComplete/onRunComplete/onError 回调，返回 unsubscribe 函数）
- 2026-06-05：登录/注册弹窗重构 — 注册改为学校名称+学号+姓名+密码+确认密码；登录改为学号+密码；新增忘记密码功能（验证学号+姓名后重置）；用户数据持久化到 localStorage（键 zhixue_users）；预置演示账号 2024001/123456；doLogin 签名改为对象格式支持 studentId/realName/school；顶部 userBadge 展示真实姓名+学号
