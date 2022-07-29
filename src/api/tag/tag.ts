import { axiosInstance } from '@/lib';

export const fetchAllTags = async () => {
  try {
    const response = await axiosInstance.get('/tag/all');
    return response.data;
  } catch (error: any) {
    return error.response;
  }
};
