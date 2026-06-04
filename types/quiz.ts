/**
 * 练习测评类型定义
 *
 * 对应接口:
 *   GET  /api/quiz?profileId=xxx        → 获取推荐练习题
 *   POST /api/quiz/submit                → 提交答案
 */

/** 题目选项 */
interface QuizOption {
  /** 选项标识 (A/B/C/D) */
  key: string;
  /** 选项文本 */
  text: string;
}

/** 题型 */
type QuizType = 'choice' | 'fill' | 'code';

/** 练习题 */
interface Quiz {
  /** 题目 ID */
  id: string;
  /** 题型 */
  quizType: QuizType;
  /** 题目标题 */
  title: string;
  /** 题目描述 */
  description: string;
  /** 代码块内容 (代码题) */
  code?: string;
  /** 选项列表 */
  options: QuizOption[];
  /** 正确答案 */
  correctAnswer: string;
  /** 答案解析 */
  analysis: string;
  /** 难度 */
  difficulty: Difficulty;
  /** 关联知识点 */
  knowledgePoints: string[];
  /** 标签 */
  tags: string[];
}

/** 答题提交 */
interface QuizSubmission {
  /** 题目 ID */
  quizId: string;
  /** 学生选择的答案 */
  selectedAnswer: string;
  /** 学生 ID */
  studentId: string;
  /** 提交时间 (ISO 8601) */
  submittedAt: string;
}

/** 答题结果 */
interface QuizResult {
  /** 是否正确 */
  correct: boolean;
  /** 正确答案 */
  correctAnswer: string;
  /** 答案解析 */
  analysis: string;
  /** 得分 (0-100) */
  score: number;
  /** 错因分类 */
  mistakeType?: '概念不清' | '计算错误' | '逻辑错误' | '审题不清';
  /** 建议补救资源 ID 列表 */
  suggestedResourceIds?: string[];
  /** 关联薄弱知识点 */
  relatedWeakPoints?: string[];
}

/** 提交响应 */
type QuizSubmitResponse = ApiResponse<QuizResult>;

/** 练习题请求 */
interface QuizRequest {
  /** 学生画像 ID */
  profileId: string;
  /** 需要的题型 */
  types?: QuizType[];
  /** 难度 */
  difficulty?: Difficulty;
}

/** 练习题响应 */
type QuizResponse = ApiResponse<Quiz[]>;
