export type Tag = {
  id: number;
  tagName: string;
};

export type TagPost = Tag & {
  posts: number;
};

export type AllTagsResponseDto = {
  data: TagPost[];
  hasErrors: boolean;
  message?: string;
  fieldErrors: [];
};
