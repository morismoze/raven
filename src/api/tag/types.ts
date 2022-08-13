export type Tag = {
  id: number;
  tagName: string;
};

export type TagPosts = Tag & {
  posts: number;
};

export type AllTagsResponseDto = {
  data: TagPosts[];
  hasErrors: boolean;
  message?: string;
  fieldErrors: [];
};
