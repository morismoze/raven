import { Tag } from '../tag/types';

export type PostUrlUploadRequestDto = {
  url: string;
  title: string;
  description: string;
  tags: Tag[];
  mature: boolean;
};

export type PostFileUploadRequestDto = {
  fileBytes: string;
  title: string;
  description: string;
  tags: Tag[];
  mature: boolean;
};
