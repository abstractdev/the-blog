export interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  username: string;
  role: string;
  comments: Comments[];
  blogpost_likes: BlogpostLikes[];
  comment_likes: CommentLikes[];
}

export interface BlogpostLikes {
  id: string;
  is_liked: boolean;
  userId: string;
  blogpostId: string;
  blogpost_title: string;
}

export interface CommentLikes {
  id: string;
  is_liked: boolean;
  userId: string;
  commentId: string;
  comment_content: string;
  created_by: string;
}

export interface Comments {
  blogpost_id: string;
  content: string;
  created_at: string;
  created_by: string;
  id: string;
  user_id: string;
}
