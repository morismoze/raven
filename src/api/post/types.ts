import { Tag } from '../tag/types';
import { Response } from '../types';

export type PostUrlUploadRequestDto = {
  url: string;
  title: string;
  description: string;
  tags: Tag[];
  mature: boolean;
};

export type Post = {
  webId: string;
  title: string;
  description: string;
  mature: boolean;
  coverUrl: string;
  username: string;
  tags: Tag[];
  upvotes: number;
  downvotes: number;
  votes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
};

export type PostComment = {
  id: number;
  comment: string;
  post: Post;
  createdAt: string;
  updatedAt: string;
};

export type PostComments = {
  comments: PostComment[];
  count: number;
};

export type PostFileUploadRequestDto = FormData;

export type NewPostId = string;

export type PostUploadResponseDto = Response<NewPostId>;

export type PostResponseDto = Response<Post>;

export type PostCommentsResponseDto = Response<PostComments>;
