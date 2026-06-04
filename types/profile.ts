/**
 * 学生画像类型定义
 *
 * 对应接口:
 *   POST /api/student/diagnose   → 提交学习困难描述，触发画像生成
 *   GET  /api/student/profile    → 获取当前学生画像
 */

/** 学生基本信息 */
interface StudentInfo {
  /** 专业 */
  major: string;
  /** 年级 (1-4) */
  year: number;
  /** 基础水平描述 */
  baseLevel: string;
  /** 学习目标 */
  goal: string;
}

/** 诊断结果 */
interface Diagnosis {
  /** 薄弱知识点列表 */
  weaknesses: string[];
  /** 已掌握知识点 */
  strengths: string[];
  /** 学习风格 */
  learningStyle: string;
  /** 资源偏好类型 */
  resourcePreference: Array<'代码示例' | '分层练习' | '错因反馈' | '视频讲解' | '思维导图'>;
}

/** 知识点掌握度 */
interface MasteryMap {
  [knowledgePoint: string]: number; // 0-100
}

/** 学生画像完整数据 */
interface StudentProfile {
  /** 画像 ID */
  id: string;
  /** 学生信息 */
  student: StudentInfo;
  /** 诊断结果 */
  diagnosis: Diagnosis;
  /** 知识点掌握度 */
  mastery: MasteryMap;
  /** 创建时间 (ISO 8601) */
  createdAt: string;
  /** 更新时间 (ISO 8601) */
  updatedAt: string;
}

/** 诊断请求 */
interface DiagnoseRequest {
  /** 学生输入的困难描述 */
  input: string;
  /** 课程名称 */
  courseName?: string;
  /** 学生 ID（可选，匿名也可用） */
  studentId?: string;
}

/** 诊断响应 */
type DiagnoseResponse = ApiResponse<StudentProfile>;

/** 画像响应 */
type ProfileResponse = ApiResponse<StudentProfile>;
