export interface PostResponse {
  userId: string;
  id: number;
  title: string;
  body: string;
}

export interface CommentResponse {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PhotoResponse {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
