import { axiosInstance } from '@/lib';
import {
  PostCommentRequestDto,
  PostFileUploadRequestDto,
  PostUrlUploadRequestDto,
} from './types';

const API_URL = import.meta.env.VITE_API_URL;

const POSTS_LIMIT = 10;

const COMMENTS_LIMIT = 15;

export const uploadPostByImageUrl = async (post: PostUrlUploadRequestDto) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/post/url/create`,
      post,
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const uploadPostByImageFile = async (post: PostFileUploadRequestDto) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/post/file/create`,
      post,
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const fetchPosts = async (page: number) => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/post/all?page=${page}&limit=${POSTS_LIMIT}`,
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const fetchPost = async (webId: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/post/${webId}`);
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const upvotePost = async (webId: string) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/post/${webId}/upvote`,
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const downvotePost = async (webId: string) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/post/${webId}/downvote`,
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const fetchPostComments = async (webId: string, page: number) => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/post/${webId}/comments?page=${page}&limit=${COMMENTS_LIMIT}`,
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const uploadPostComment = async (
  webId: string,
  comment: PostCommentRequestDto,
) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/post/${webId}/comments/create`,
      comment,
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const upvotePostComment = async (webId: string, commentId: number) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/post/${webId}/comments/${commentId}/upvote`,
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};

export const downvotePostComment = async (webId: string, commentId: number) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/post/${webId}/comments/${commentId}/downvote`,
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
