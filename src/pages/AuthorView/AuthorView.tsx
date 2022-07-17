import { useContext, useEffect, useState } from "react";
import {
  BlogDataArrayType,
  BlogDataInterface,
} from "../../interfaces/BlogData";
import { AuthContext } from "../../contexts/AuthContext";
import AuthorViewForm from "../../components/AuthorViewForm/AuthorViewForm";
import AuthorViewContainer from "../../components/AuthorViewForm/AuthorViewContainer";

function AuthorView() {
  const [authorBlogpostData, setAuthorBlogpostData] =
    useState<BlogDataArrayType | null>(null);
  const { user } = useContext(AuthContext);
  const [showNothingMessage, setShowNothingMessage] = useState(false);

  useEffect(() => {
    (async () => {
      //fetch all blogposts
      const res = await fetch("https://a-blog-api.herokuapp.com/blog");
      const resData = await res.json();
      const filtered = resData?.filter(
        (e: BlogDataInterface) => e.user_id === user.id
      );
      if (!filtered.length) {
        setShowNothingMessage(true);
      } else {
        setAuthorBlogpostData(filtered);
      }
    })();
  }, []);

  return (
    <>
      <h2>Your Posts</h2>
      <AuthorViewContainer>
        {!showNothingMessage ? (
          <AuthorViewForm
            authorBlogpostData={authorBlogpostData}
            setAuthorBlogpostData={setAuthorBlogpostData}
          />
        ) : (
          <span className="light-text">Nothing Here</span>
        )}
      </AuthorViewContainer>
    </>
  );
}

export default AuthorView;
