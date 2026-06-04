/**
 * 课程知识库类型定义
 *
 * 对应接口:
 *   GET  /api/teacher/knowledge          → 获取课程知识库
 *   POST /api/teacher/knowledge/upload   → 上传课程资料
 */

/** 章节 */
interface Chapter {
  /** 章节 ID */
  id: string;
  /** 章节标题 */
  title: string;
  /** 知识点标签 */
  tags: string[];
  /** 关联资源数量 */
  resourceCount: number;
  /** 是否已向量化索引 */
  indexed: boolean;
  /** 上传时间 */
  uploadedAt?: string;
}

/** 课程知识库 */
interface KnowledgeBase {
  /** 课程名称 */
  courseName: string;
  /** 章节列表 */
  chapters: Chapter[];
  /** 总资源数 */
  totalResources: number;
  /** 已索引资源数 */
  indexedResources: number;
  /** 最近上传时间 (ISO 8601) */
  uploadedAt: string;
  /** 最近索引时间 (ISO 8601) */
  lastIndexedAt?: string;
}

/** 上传请求 */
interface UploadPayload {
  /** 文件对象 (前端) / 文件路径 (后端) */
  file: File | string;
  /** 课程名称 */
  courseName: string;
  /** 所属章节 ID */
  chapterId?: string;
  /** 文件类型 */
  fileType?: '课件' | '实验指导' | '题库' | '示例代码' | '其他';
}

/** 知识库响应 */
type KnowledgeResponse = ApiResponse<KnowledgeBase>;

/** 上传响应 */
interface UploadResponse {
  code: number;
  data: {
    fileId: string;
    fileName: string;
    status: 'uploaded' | 'parsing' | 'indexed' | 'failed';
  };
  message: string;
}
