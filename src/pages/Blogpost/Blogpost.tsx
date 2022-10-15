import { useParams } from "react-router-dom";
import { BlogDataInterface } from "../../interfaces/BlogData";
import { useEffect, useState } from "react";
import BlogpostCard from "../../components/BlogpostCard/BlogpostCard";
import CommentFormCard from "../../components/CommentFormCard/CommentFormCard";
import Comments from "../../components/Comments/Comments";
import { CommentsArrayType } from "../../interfaces/Comments";

function Blogpost() {
  const [comments, setComments] = useState<CommentsArrayType | null>(null);
  const [blogpostId, setBlogpostId] = useState("");
  const [blogpostData, setBlogpostData] = useState<BlogDataInterface | null>(
    null
  );
  const { blogpostTitle } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://the-blog-backend.onrender.com/blog/${blogpostTitle}`
      );
      const resData = await res.json();
      setBlogpostData(resData);
      setBlogpostId(resData.id);
      setComments(resData.comments);
    })();
  }, []);

  return (
    <>
      <BlogpostCard blogpostData={blogpostData} blogpostTitle={blogpostTitle} />
      <Comments comments={comments} blogpostId={blogpostId} />
      <CommentFormCard
        blogpostId={blogpostId}
        comments={comments}
        setComments={setComments}
      />
    </>
  );
}

export default Blogpost;
