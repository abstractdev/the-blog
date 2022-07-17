export interface BlogDataInterface {
  id: string;
  title: string;
  image_url: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  user_id: string;
  categories: [
    {
      id: string;
      name: string;
    }
  ];
  comments: [{}];
  commentQt: number;
  user: {
    first_name: string;
    last_name: string;
    username: string;
  };
  blogpost_likes: {
    id: string;
    is_liked: boolean;
    userId: string;
    blogpostId: string;
  }[];
  blogpostLikesQt: number;
}
export type BlogDataArrayType = BlogDataInterface[];
export type setCategorizedBlogDataType = (
  blogData: BlogDataArrayType | null
) => void;
