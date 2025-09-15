export interface PostsResponseI {
  data: PostI[];
  total: number;
}

export interface PostI {
  id: number;
  authorId: number;
  title: string;
  slug: string;
  excerpt: string;
  contentMd: string;
  contentJson: null;
  coverImageUrl: string;
  status: string;
  isPinned: boolean;
  publishedAt: string | null;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  readingTimeMin: number;
  userId: number | null;
}
export interface CreatedPostResponseI {
  id: number;
  authorId: number;
  title: string;
  slug: string;
  excerpt: string;
  contentMd: string;
  contentJson?: null;
  coverImageUrl: string;
  status: string;
  isPinned: boolean;
  publishedAt: string | null;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: string | null;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  readingTimeMin: number;
  userId: number | null;
}

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}
