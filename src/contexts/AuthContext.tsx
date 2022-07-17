import { createContext } from "react";

export const defaultUser = {
  user: {
    id: "",
    first_name: null,
    last_name: null,
    username: "",
    role: "",
    comments: [
      {
        id: "",
        content: "",
        created_by: "",
        created_at: "",
        user_id: "",
        blogpost_id: "",
      },
    ],
    blogpost_likes: [
      {
        id: "",
        is_liked: false,
        userId: "",
        blogpostId: "",
        blogpost_title: "",
      },
    ],
    comment_likes: [
      {
        id: "",
        userId: "",
        commentId: "",
        comment_content: "",
        is_liked: false,
      },
    ],
    isLoggedIn: false,
  },
};

export type DefaultUserType = {
  user: any;
  setUser?: (user: any) => void;
};

export const AuthContext = createContext<DefaultUserType>({
  user: defaultUser,
  setUser: () => {},
});
