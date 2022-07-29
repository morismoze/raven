export type Tag = {
  id: string;
  tagName: string;
};

export type AllTagsResponseDto = {
  data: Tag[];
  hasErrors: boolean;
  message?: string;
  fieldErrors: [];
};
