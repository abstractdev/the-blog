interface BlogDataInterface {
  id: string;
  title: string;
  image_url: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  user_id: string;
  categories: [{}];
}
export type BlogDataType = BlogDataInterface[];
export type setCategorizedBlogDataType = (
  blogData: BlogDataType | null
) => void;
