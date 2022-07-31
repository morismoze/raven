import { Tag } from '../tag/types';
import { Response } from '../types';

export type PostUrlUploadRequestDto = {
  url: string;
  title: string;
  description: string;
  tags: Tag[];
  mature: boolean;
};

export type PostFileUploadRequestDto = FormData;

export type NewPostId = string;

export type PostUploadResponseDto = Response<NewPostId>;

export type Post = {
  webId: string;
  title: string;
  description: string;
  mature: boolean;
  url: string;
  username: string;
  tags: Tag[];
  postUpvotes: number;
  postDownvotes: number;
  createdAt: string;
  updatedAt: string;
};

export type PostResponseDto = Response<Post>;
