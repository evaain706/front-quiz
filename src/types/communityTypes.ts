export interface Comment {
  _id: string;
  nickname: string;
  content: string;
  createdAt: string;
}

export interface Post {
  _id: string;
  category: 'question' | 'information' | string;
  title: string;
  content: string;
  nickname: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostResponse {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  posts: Post[];
}

export interface PostForm {
  category: 'question' | 'information';
  title: string;
  content: string;
  nickname: string;
  password: string;
}

export interface EditPostForm {
  postId: string;
  title: string;
  content: string;
  category: 'question' | 'information';
  password: string;
}
