/**
 * 学习路径类型定义
 *
 * 对应接口:
 *   GET /api/student/path?profileId=xxx  → 获取推荐学习路径
 */

/** 路径步骤类型 */
type PathStepType = 'review' | 'practice' | 'challenge' | 'project';

/** 步骤状态 */
type StepStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';

/** 学习路径步骤 */
interface PathStep {
  /** 步骤序号 */
  order: number;
  /** 步骤标题 */
  title: string;
  /** 步骤描述 */
  description: string;
  /** 预计耗时 */
  duration: string;
  /** 步骤类型 */
  type: PathStepType;
  /** 当前状态 */
  status: StepStatus;
  /** 前置步骤 ID 列表 */
  prerequisites: string[];
  /** 关联资源 ID */
  resourceId?: string;
  /** 预期输出描述 */
  expectedOutput?: string;
}

/** 完整学习路径 */
interface LearningPath {
  /** 路径 ID */
  id: string;
  /** 学生画像 ID */
  profileId: string;
  /** 步骤列表 */
  steps: PathStep[];
  /** 生成时间 (ISO 8601) */
  generatedAt: string;
  /** 总预计时长 */
  totalDuration: string;
  /** 已完成步骤数 */
  completedSteps: number;
  /** 路径状态 */
  status: 'active' | 'completed' | 'abandoned';
}

/** 学习路径响应 */
type PathResponse = ApiResponse<LearningPath>;

/** 路径步骤更新请求 */
interface UpdateStepRequest {
  pathId: string;
  stepOrder: number;
  status: StepStatus;
}
