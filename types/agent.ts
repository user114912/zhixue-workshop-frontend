/**
 * Agent 协作类型定义
 *
 * 对应接口:
 *   POST /api/agents/runs                  → 触发 Agent 运行
 *   GET  /api/agents/runs/:run_id          → 获取某次运行的整体状态
 *   GET  /api/agents/runs/:run_id/steps    → 获取步骤详情
 *   GET  /api/agents/runs/:run_id/events   → 获取 Agent 执行事件流 (SSE)
 */

/** Agent 角色 */
type AgentRole =
  | 'diagnosis'       // 学情诊断
  | 'retrieval'       // 知识检索
  | 'lecture'         // 讲义生成
  | 'quiz_gen'        // 题目生成
  | 'path_planner';   // 路径规划

/** Agent 状态 */
type AgentStatus = 'ready' | 'running' | 'done' | 'error' | 'skipped';

/** 步骤状态 */
type StepStatus = 'ready' | 'running' | 'done' | 'error' | 'skipped';

/** 运行类型 */
type RunType = 'resource_generation' | 'quiz_generation' | 'diagnosis' | 'path_planning';

/** 运行整体状态 */
type RunStatus = 'running' | 'completed' | 'failed';

/** 单个 Agent 定义 */
interface Agent {
  /** Agent ID */
  id: string;
  /** 显示头像字符 */
  avatar: string;
  /** Agent 名称 */
  name: string;
  /** 职责描述 */
  description: string;
  /** 角色类型 */
  role: AgentRole;
  /** 当前状态 */
  status: AgentStatus;
  /** 预估/实际耗时 */
  duration: string;
  /** 子步骤定义 */
  steps: AgentStepDef[];
  /** 输入摘要 (执行时填充) */
  inputSummary?: string;
  /** 输出摘要 (执行时填充) */
  output?: string;
  /** 引用的知识点 */
  referencedKnowledge?: string[];
  /** 错误信息 */
  errorMessage?: string;
}

/** Agent 步骤定义（元数据） */
interface AgentStepDef {
  /** 步骤 ID */
  stepId: string;
  /** 步骤名称 */
  name: string;
  /** 步骤顺序 */
  order: number;
}

/** Agent 运行记录（对齐 agent_runs 表） */
interface AgentRun {
  /** 运行 ID（原 sessionId） */
  run_id: string;
  /** 运行类型 */
  run_type: RunType;
  /** 用户 ID */
  user_id: string;
  /** 课程 ID */
  course_id: string;
  /** 整体状态 */
  status: RunStatus;
  /** 运行输入 */
  input_json: Record<string, unknown> | null;
  /** 运行输出 */
  output_json: Record<string, unknown> | null;
  /** Agent 列表及执行状态 */
  agents: Array<{
    id: string;
    status: AgentStatus;
    duration: string;
    output: string;
    stepIds: string[];
    errorMessage?: string;
  }>;
  /** 开始时间 (ISO 8601) */
  started_at: string;
  /** 完成时间 (ISO 8601) */
  completed_at: string | null;
  /** 结束时间 (ISO 8601) */
  finished_at: string | null;
  /** 错误信息 */
  error_message: string | null;
}

/** Agent 步骤详情（对齐 agent_steps 表） */
interface AgentStep {
  /** 步骤 ID */
  step_id: string;
  /** 所属运行 ID */
  run_id: string;
  /** 所属 Agent ID */
  agent_id: string;
  /** Agent 名称 */
  agent_name: string;
  /** 步骤顺序 */
  step_order: number;
  /** 步骤状态 */
  status: StepStatus;
  /** 输入摘要 */
  input_summary: string;
  /** 输出摘要 */
  output_summary: string;
  /** 耗时（毫秒） */
  duration_ms: number | null;
  /** 开始时间 (ISO 8601) */
  started_at: string | null;
  /** 完成时间 (ISO 8601) */
  finished_at: string | null;
  /** 错误信息 */
  error_message: string | null;
}

/** Agent 事件 */
interface AgentEvent {
  /** 事件 ID */
  id: string;
  /** 所属运行 ID */
  run_id: string;
  /** 所属 Agent ID */
  agent_id: string;
  /** 所属步骤 ID（agent_complete / run_complete 时为 null） */
  step_id: string | null;
  /** 事件类型 */
  type: 'step_start' | 'step_progress' | 'step_complete' | 'agent_complete' | 'run_complete' | 'error';
  /** 事件数据 */
  data: string;
  /** 时间戳 (ISO 8601) */
  timestamp: string;
}

/** 获取运行状态响应 */
type AgentRunResponse = ApiResponse<AgentRun>;

/** 获取步骤列表响应 */
type AgentStepsResponse = ApiResponse<AgentStep[]>;

/** 获取事件流响应 */
type AgentEventsResponse = ApiResponse<AgentEvent[]>;

/** 触发 Agent 工作流请求 */
interface TriggerAgentRunRequest {
  /** 学生画像 ID */
  profileId: string;
  /** 课程名称 */
  courseName?: string;
  /** 需要运行的 Agent 列表（默认全部） */
  agents?: AgentRole[];
}

/** SSE 订阅回调 */
interface AgentRunCallbacks {
  /** 步骤开始 */
  onStepStart?: (event: AgentEvent) => void;
  /** 步骤进度更新 */
  onStepProgress?: (event: AgentEvent) => void;
  /** 步骤完成 */
  onStepComplete?: (event: AgentEvent) => void;
  /** Agent 完成 */
  onAgentComplete?: (event: AgentEvent) => void;
  /** 整个运行完成 */
  onRunComplete?: (run: AgentRun) => void;
  /** 错误 */
  onError?: (error: { message: string; event?: AgentEvent }) => void;
}
