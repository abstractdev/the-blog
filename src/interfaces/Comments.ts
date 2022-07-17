export interface CommentsInterface {
  id?: string;
  content?: string;
  created_by?: string;
  created_at?: string;
  user_id?: string;
  blogpost_id?: string;
}

export type CommentsArrayType = CommentsInterface[];
