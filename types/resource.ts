/**
 * 学习资源类型定义
 *
 * 对应接口:
 *   GET /api/student/resources?profileId=xxx  → 获取个性化资源列表
 */

/** 资源类型 */
type ResourceType = '讲义' | '练习' | '代码' | '导图' | '阅读' | '视频';

/** 难度等级 */
type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';

/** 学习资源 */
interface Resource {
  /** 资源 ID */
  id: string;
  /** 资源类型 */
  type: ResourceType;
  /** 资源标题 */
  title: string;
  /** 资源描述 */
  description: string;
  /** 关联知识点标签 */
  tags: string[];
  /** 难度 */
  difficulty: Difficulty;
  /** 资源内容 (HTML) */
  body: string;
  /** 创建时间 (ISO 8601) */
  createdAt: string;
  /** 更新时间 (ISO 8601) */
  updatedAt?: string;
  /** 来源章节 */
  sourceChapter?: string;
  /** 关联的学生画像 ID */
  profileId?: string;
  /** 审核状态 (教师端用) */
  reviewStatus?: 'pending' | 'approved' | 'rejected';
}

/** 资源列表响应 */
type ResourcesResponse = ApiResponse<Resource[]>;

/** 资源生成请求 */
interface GenerateResourcesRequest {
  /** 学生画像 ID */
  profileId: string;
  /** 需要生成的资源类型 */
  types?: ResourceType[];
}
