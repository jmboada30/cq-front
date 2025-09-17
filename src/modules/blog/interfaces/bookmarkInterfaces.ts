export interface FindBookmarkResponseI {
  data: BookmarkI[];
  total: number;
}

export interface BookmarkI {
  userId: number;
  postId: number;
  createdAt: Date;
}
