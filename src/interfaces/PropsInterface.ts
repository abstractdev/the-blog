import { BlogDataType } from "./BlogData";
export interface PropsInterface {
  formTitle?: string;
  children?: any;
  isLoading?: boolean;
  blogData?: BlogDataType | null;
  categorizedBlogData?: BlogDataType | null;
  setCategorizedBlogData?: (blogData: BlogDataType | null) => void;
}
