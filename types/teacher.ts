/**
 * 教师端类型定义
 *
 * 对应接口:
 *   GET  /api/teacher/dashboard          → 获取教师看板数据
 *   GET  /api/teacher/resources/review   → 获取待审核资源列表
 *   POST /api/teacher/resources/review   → 提交审核结果
 *   GET  /api/teacher/classroom          → 获取班级学情数据
 */

/** 指标卡片 */
interface MetricCard {
  /** 卡片 ID */
  id: string;
  /** 指标标题 */
  title: string;
  /** 指标数值 */
  value: string;
  /** 变化量 */
  change?: string;
  /** 变化方向 */
  changeDirection?: 'up' | 'down';
  /** 关联数量 */
  count?: string;
  /** 描述 */
  description: string;
}

/** 审核资源项 */
interface ReviewItem {
  /** 资源 ID */
  id: string;
  /** 资源标题 */
  title: string;
  /** 资源类型 */
  type: '讲义' | '练习' | '代码' | '导图' | '阅读';
  /** 生成者 */
  author: string;
  /** 审核状态 */
  status: 'pending' | 'approved' | 'rejected';
  /** 提交时间 (ISO 8601) */
  submittedAt: string;
  /** 内容预览 (前200字) */
  preview: string;
  /** 退回原因 */
  rejectReason?: string;
  /** 审核时间 (ISO 8601) */
  reviewedAt?: string;
  /** 审核人 */
  reviewedBy?: string;
}

/** 薄弱点统计 */
interface WeaknessStat {
  /** 知识点名称 */
  name: string;
  /** 受影响学生数 */
  count: number;
}

/** 掌握度分布 */
interface MasteryDistribution {
  /** 优秀 >= 85% */
  excellent: number;
  /** 良好 70-84% */
  good: number;
  /** 一般 50-69% */
  average: number;
  /** 困难 < 50% */
  struggling: number;
}

/** 班级学情 */
interface ClassroomStats {
  /** 班级总人数 */
  totalStudents: number;
  /** 平均掌握度百分比 */
  averageMastery: number;
  /** 掌握度分布 */
  distribution: MasteryDistribution;
  /** 高频薄弱点 */
  topWeaknesses: WeaknessStat[];
}

/** 学生记录 */
interface StudentRecord {
  /** 学生 ID */
  id: string;
  /** 姓名 */
  name: string;
  /** 掌握度 (0-100) */
  mastery: number;
  /** 最近活动 */
  recentActivity: string;
  /** 薄弱点列表 */
  weakPoints: string[];
}

/** 教学建议 */
interface TeachingAdvice {
  /** 标题 */
  title: string;
  /** 建议列表 */
  suggestions: string[];
  /** 推荐资源 */
  recommendedResources: string[];
}

/** 教师看板完整数据 */
interface TeacherDashboard {
  /** 指标卡片 */
  metrics: MetricCard[];
  /** 审核队列 */
  reviewQueue: ReviewItem[];
  /** 班级学情 */
  classroom: ClassroomStats;
  /** 学生列表 */
  students: StudentRecord[];
  /** 教学建议 */
  teachingAdvice: TeachingAdvice;
}

/** 审核请求 */
interface ReviewActionRequest {
  /** 资源 ID */
  resourceId: string;
  /** 审核操作 */
  action: 'approve' | 'reject';
  /** 退回原因 (reject 时必填) */
  reason?: string;
}

/** 教师看板响应 */
type DashboardResponse = ApiResponse<TeacherDashboard>;

/** 审核列表响应 */
type ReviewListResponse = ApiResponse<ReviewItem[]>;

/** 班级学情响应 */
type ClassroomResponse = ApiResponse<ClassroomStats & { students: StudentRecord[] }>;

/** 审核操作响应 */
type ReviewActionResponse = ApiResponse<{ resourceId: string; newStatus: 'approved' | 'rejected' }>;
