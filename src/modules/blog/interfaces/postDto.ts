import type { PostStatus } from './postInterfaces';

export interface PostDto {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  contentMd: string;
  coverImageUrl?: string;
  status: string;
  isPinned: boolean;
  scheduledAt: string;
}

export interface PostFilterDto {
  inputSearch?: string;
  status?: PostStatus;
  categoryId?: number;
  tagId?: number;
}
