import { CategoriesType } from "./CategoriesInterface";
import { BlogDataInterface, BlogDataArrayType } from "./BlogData";
import { CommentsArrayType } from "./Comments";
import { ProfileData } from "./ProfileData";
export interface PropsInterface {
  formTitle?: string;
  children?: any;
  isLoading?: boolean;
  blogData?: BlogDataArrayType | null;
  categorizedBlogData?: BlogDataArrayType | null;
  setCategorizedBlogData?: (blogData: BlogDataArrayType | null) => void;
  blogpostData?: BlogDataInterface | null;
  blogpostTitle?: string;
  comments?: CommentsArrayType | null;
  setComments?: (comments: CommentsArrayType | null) => void;
  blogpostId?: string;
  anonymousToken?: string;
  blogpostLikesLength?: number;
  blogpostLikesQt?: number;
  setBlogpostLikesQt?: (blogpostLikesQt: number) => void;
  profileData?: ProfileData | null;
  blogpostIsLiked?: boolean;
  setBlogpostIsLiked?: (blogpostIsLiked: boolean) => void;
  commentId?: string;
  commentContent?: string;
  createdBy?: string;
  categoryData?: CategoriesType | null;
  authorBlogpostData?: BlogDataArrayType | null;
  setAuthorBlogpostData?: (
    authorBlogpostData: BlogDataArrayType | null
  ) => void;
  buttonName?: string;
  formName?: string;
  setCategoryData?: (categoryData: CategoriesType | null) => void;
  setCategoriesData?: (categoryData: CategoriesType | null) => void;
}
