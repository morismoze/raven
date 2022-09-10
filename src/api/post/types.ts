import { Tag } from '../tag/types';
import { Response } from '../types';

export type PostUrlUploadRequestDto = {
  url: string;
  title: string;
  description: string;
  tags: Tag[];
  mature: boolean;
};

export type ReducedPost = {
  webId: string;
  title: string;
  mature: boolean;
  coverUrl: string;
  coverBlurHash: string;
  coverWidth: number;
  coverHeight: number;
  votes: number;
  comments: number;
  views: number;
};

export type Posts = {
  posts: ReducedPost[];
  count: number;
  nextPage: number | null;
};

export type Post = {
  webId: string;
  title: string;
  description: string;
  mature: boolean;
  coverUrl: string;
  coverBlurHash: string;
  coverWidth: number;
  coverHeight: number;
  userId: number;
  username: string;
  userPrincipalUpvoted: boolean;
  userPrincipalDownvoted: boolean;
  tags: Tag[];
  upvotes: number;
  downvotes: number;
  votes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
};

export type NewestPost = {
  webId: string;
  title: string;
  mature: boolean;
  coverUrl: string;
  coverBlurHash: string;
  coverWidth: number;
  coverHeight: number;
  createdAt: string;
  updatedAt: string;
};

export type PostComment = {
  id: number;
  comment: string;
  userId: number;
  username: string;
  upvotes: number;
  downvotes: number;
  votes: number;
  userPrincipalUpvoted: boolean;
  userPrincipalDownvoted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PostComments = {
  comments: PostComment[];
  count: number;
  nextPage: number | null;
};

export type PostCommentRequestDto = {
  comment: string;
};

export type PostCommentReportReason = {
  id: number;
  reasonValue: string;
};

export type PostCommentReportRequestDto = {
  description: string;
  reason: PostCommentReportReason;
};

export type PostCommentEditRequestDto = {
  comment: string;
};

export type PostFileUploadRequestDto = FormData;

export type NewPostId = string;

export type PostUploadResponseDto = Response<NewPostId>;

export type PostsResponseDto = Response<Posts>;

export type Newest20PostsResponseDto = Response<NewestPost[]>;

export type PostCommentReportReasonsResponseDto = Response<
  PostCommentReportReason[]
>;

export type PostResponseDto = Response<Post>;

export type PostVoteResponseDto = Response<number>;

export type PostCommentsResponseDto = Response<PostComments>;

export type PostCommentVoteResponseDto = Response<number>;
