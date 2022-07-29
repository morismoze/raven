import { Tag } from '../tag/types';

export type PostUploadRequestDto = {
  url: string;
  title: string;
  description: string;
  tags: Tag[];
  mature: boolean;
};
