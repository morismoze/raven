import { axiosInstance } from '@/lib';

export const fetchAllTags = async () => {
  const response = await axiosInstance.get('/tag/all');
  return response.data;
};
