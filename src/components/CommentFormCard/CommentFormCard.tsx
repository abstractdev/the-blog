import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { PropsInterface } from "../../interfaces/PropsInterface";
import styles from "./CommentFormCard.module.scss";

function CommentFormCard(props: PropsInterface) {
  const { blogpostId, setComments } = props;
  const { user } = useContext(AuthContext);
  const { blogpostTitle } = useParams();
  const [commentFormData, setCommentFormData] = useState({
    created_by: "",
    content: "",
    created_at: "",
    blogpost_id: blogpostId,
  });

  function handleOnChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setCommentFormData({
      ...commentFormData,
      [event.target.name]: event.target.value,
      created_at: new Date().toDateString(),
      blogpost_id: blogpostId,
    });
  }
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (user.isLoggedIn) {
      await fetch("https://a-blog-api3.herokuapp.com/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          content: commentFormData.content,
          blogpost_id: commentFormData.blogpost_id,
        }),
      });
    }
    if (!user.isLoggedIn) {
      await fetch("https://a-blog-api3.herokuapp.com/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          created_by: commentFormData.created_by,
          content: commentFormData.content,
          blogpost_id: commentFormData.blogpost_id,
        }),
      });
    }
    const blogpost = await fetch(
      `https://a-blog-api3.herokuapp.com/blog/${blogpostTitle}`,
      { method: "GET" }
    );
    const blogpostData = await blogpost.json();
    setComments!(blogpostData.comments);
    setCommentFormData({
      created_by: "",
      content: "",
      created_at: "",
      blogpost_id: blogpostId,
    });
  }
  return (
    <form
      className={styles["comment-form-card"]}
      onSubmit={(event) => handleSubmit(event)}
    >
      <h3 className={styles.header}>GOT SOMETHING TO SAY?</h3>
      {!user.isLoggedIn && (
        <div className={styles.name}>
          <label htmlFor="created_by">Name</label>
          <input
            type="text"
            name="created_by"
            onChange={(event) => handleOnChange(event)}
            value={commentFormData.created_by}
          />
        </div>
      )}
      <div className={styles.comment}>
        <label htmlFor="content">Comment</label>
        <textarea
          name="content"
          cols={30}
          rows={10}
          onChange={(event) => handleOnChange(event)}
          value={commentFormData.content}
        ></textarea>
      </div>
      <button type="submit" className={styles["comment-button"]}>
        POST COMMENT
      </button>
    </form>
  );
}

export default CommentFormCard;
