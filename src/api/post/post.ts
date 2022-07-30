import { axiosInstance } from '@/lib';
import { PostFileUploadRequestDto, PostUrlUploadRequestDto } from './types';

const API_URL = import.meta.env.VITE_API_URL;

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
