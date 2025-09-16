import { storeToRefs } from 'pinia';
import { usePostStore } from '../stores/postStore';
import { useCommentStore } from '../stores/commentsStore';

export const useManageBlogStore = () => {
  const postStore = usePostStore();
  const { post, postDto, posts, postFilter } = storeToRefs(postStore);

  const commentStore = useCommentStore();
  const { comment, commentDto, commentFilter, comments } = storeToRefs(commentStore);

  return {
    post,
    postDto,
    posts,
    postFilter,
    setPost: postStore.setPost,
    setPostDto: postStore.setPostDto,
    setPosts: postStore.setPosts,
    setPostFilter: postStore.setPostFilter,
    resetPosts: postStore.resetPosts,
    resetPost: postStore.resetPost,
    resetPostFilter: postStore.resetPostFilter,

    comment,
    commentDto,
    commentFilter,
    comments,
    // Setters
    setComment: commentStore.setComment,
    setCommentDto: commentStore.setCommentDto,
    setComments: commentStore.setComments,
    setCommentFilter: commentStore.setCommentFilter,
    // Resets
    resetComment: commentStore.resetComment,
    resetCommentDto: commentStore.resetCommentDto,
    resetComments: commentStore.resetComments,
    resetCommentFilter: commentStore.resetCommentFilter,
  };
};
