/**
 * Agent 协作类型定义
 *
 * 对应接口:
 *   GET /api/agents/runs/:runId         → 获取某次运行的整体状态
 *   GET /api/agents/runs/:runId/events  → 获取 Agent 执行事件流
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
  /** 子步骤 */
  steps: string[];
  /** 输入摘要 (执行时填充) */
  inputSummary?: string;
  /** 输出摘要 (执行时填充) */
  output?: string;
  /** 引用的知识点 */
  referencedKnowledge?: string[];
  /** 错误信息 */
  errorMessage?: string;
}

/** Agent 运行记录 */
interface AgentRun {
  /** 运行 ID */
  sessionId: string;
  /** Agent 列表及执行状态 */
  agents: Array<{
    id: string;
    status: AgentStatus;
    duration: string;
    output: string;
    errorMessage?: string;
  }>;
  /** 开始时间 (ISO 8601) */
  startedAt: string;
  /** 完成时间 (ISO 8601) */
  completedAt?: string;
  /** 整体状态 */
  overallStatus: 'running' | 'completed' | 'failed';
}

/** Agent 事件 */
interface AgentEvent {
  /** 事件 ID */
  id: string;
  /** 所属 Agent ID */
  agentId: string;
  /** 事件类型 */
  type: 'start' | 'progress' | 'complete' | 'error';
  /** 事件数据 */
  data: string;
  /** 时间戳 (ISO 8601) */
  timestamp: string;
}

/** 获取运行状态响应 */
type AgentRunResponse = ApiResponse<AgentRun>;

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
