export interface BookmarkDto {
  id?: number;
  postId: number;
}

export interface BookmarkFilterDto {
  limit?: number;
  offset?: number;
  postId?: number;
  userId?: number;
}
