import { axiosInstance } from '@/lib';
import {
  PostCommentReportRequestDto,
  PostCommentRequestDto,
  PostFileUploadRequestDto,
  PostUrlUploadRequestDto,
} from './types';

const API_URL = import.meta.env.VITE_API_URL;
const POSTS_LIMIT = 10;
const COMMENTS_LIMIT = 15;

export const uploadPostByImageUrl = async (post: PostUrlUploadRequestDto) => {
  const response = await axiosInstance.post(`${API_URL}/post/url/create`, post);
  return response.data;
};

export const uploadPostByImageFile = async (post: PostFileUploadRequestDto) => {
  const response = await axiosInstance.post(
    `${API_URL}/post/file/create`,
    post,
  );
  return response.data;
};

export const fetchPosts = async (page: number) => {
  const response = await axiosInstance.get(
    `${API_URL}/post/all?page=${page}&limit=${POSTS_LIMIT}`,
  );
  return response.data;
};

export const fetchPostsByTagName = async (tagName: string, page: number) => {
  const response = await axiosInstance.get(
    `${API_URL}/post/all?tagName=${tagName}&page=${page}&limit=${POSTS_LIMIT}`,
  );
  return response.data;
};

export const fetchNewest20Posts = async () => {
  const response = await axiosInstance.get(`${API_URL}/post/newest`);
  return response.data;
};

export const fetchPost = async (webId: string) => {
  const response = await axiosInstance.get(`${API_URL}/post/${webId}`);
  return response.data;
};

export const fetchPostComments = async (webId: string, page: number) => {
  const response = await axiosInstance.get(
    `${API_URL}/post/${webId}/comments?page=${page}&limit=${COMMENTS_LIMIT}`,
  );
  return response.data;
};

export const upvotePost = async (webId: string) => {
  const response = await axiosInstance.post(`${API_URL}/post/${webId}/upvote`);
  return response.data;
};

export const downvotePost = async (webId: string) => {
  const response = await axiosInstance.post(
    `${API_URL}/post/${webId}/downvote`,
  );
  return response.data;
};

export const uploadPostComment = async (
  webId: string,
  comment: PostCommentRequestDto,
) => {
  const response = await axiosInstance.post(
    `${API_URL}/post/${webId}/comments/create`,
    comment,
  );
  return response.data;
};

export const upvotePostComment = async (webId: string, commentId: number) => {
  const response = await axiosInstance.post(
    `${API_URL}/post/${webId}/comments/${commentId}/upvote`,
  );
  return response.data;
};

export const downvotePostComment = async (webId: string, commentId: number) => {
  const response = await axiosInstance.post(
    `${API_URL}/post/${webId}/comments/${commentId}/downvote`,
  );
  return response.data;
};

export const fetchPostCommentReportReasons = async () => {
  const response = await axiosInstance.get(
    `${API_URL}/post-comment-report-reason/all`,
  );
  return response.data;
};

export const reportPostComment = async (
  webId: string,
  commentId: number,
  data: PostCommentReportRequestDto,
) => {
  const response = await axiosInstance.post(
    `${API_URL}/post/${webId}/comments/${commentId}/report`,
    data,
  );
  return response.data;
};
