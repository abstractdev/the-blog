import styles from "./CommentLike.module.scss";
import { PropsInterface } from "../../interfaces/PropsInterface";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CommentLikes } from "../../interfaces/ProfileData";

function CommentLike(props: PropsInterface) {
  const { commentId, commentContent, blogpostId, createdBy } = props;
  const [commentLikesQt, setCommentLikesQt] = useState<null | number>(0);
  const { user } = useContext(AuthContext);
  const [loginReqMsgIsVisible, setLoginReqMsgIsVisible] = useState(false);

  useEffect(() => {
    (async () => {
      //fetch single comment
      const res = await fetch(
        `https://the-blog-backend.onrender.com/comment/${blogpostId}`
      );
      const resData = await res.json();
      resData.forEach((e: any) => {
        if (e.id === commentId) {
          setCommentLikesQt(e.comment_likes.length);
        }
      });
    })();
  }, []);

  function handleOnClick(event: React.MouseEvent) {
    event.preventDefault();
    const targetId = event.currentTarget.id;
    if (createdBy === user.username) {
      return;
    }
    (async () => {
      //fetch single comment
      const res = await fetch(
        `https://the-blog-backend.onrender.com/comment/single/${commentId}`
      );
      const resData = await res.json();
      //find an existing like instance
      const likedEntry = resData.comment_likes.find(
        (e: CommentLikes) => e.userId === user.id
      );
      //if it doesn't exist and dislike is pressed, nothing happens
      if (targetId === "commentDislike" && !likedEntry && user.isLoggedIn) {
        return;
      }
      //if it doesn't exist create one
      if (targetId === "commentLike" && !likedEntry && user.isLoggedIn) {
        (async () => {
          await fetch(
            `https://the-blog-backend.onrender.com/commentLike/${commentId}`,
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                comment_content: commentContent,
                created_by: createdBy,
              }),
            }
          );
          handleCommentLikesQt();
        })();
      } else if (
        targetId === "commentDislike" &&
        likedEntry &&
        user.isLoggedIn
      ) {
        //if it exists, delete it
        (async () => {
          await fetch(
            `https://the-blog-backend.onrender.com/commentLike/${commentId}`,
            {
              method: "DELETE",
              credentials: "include",
            }
          );
          handleCommentLikesQt();
        })();
      } else {
        setLoginReqMsgIsVisible(true);
        setTimeout(() => {
          setLoginReqMsgIsVisible(false);
        }, 2000);
      }
    })();
  }

  function handleCommentLikesQt() {
    (async () => {
      //fetch single comment
      const res = await fetch(
        `https://the-blog-backend.onrender.com/comment/single/${commentId}`
      );
      const resData = await res.json();
      //set qt of likes
      setCommentLikesQt(resData.comment_likes.length);
    })();
  }

  return (
    <>
      <span>{`${commentLikesQt} likes`}</span>
      <button
        className={styles["like-container"]}
        onClick={(event) => handleOnClick(event)}
        id="commentLike"
      >
        <Icon icon="ant-design:like-outlined" className={styles.like} />
      </button>
      <button
        className={styles["dislike-container"]}
        onClick={(event) => handleOnClick(event)}
        id="commentDislike"
      >
        <Icon icon="ant-design:dislike-outlined" className={styles.like} />
        {loginReqMsgIsVisible && (
          <p className={styles.error}>You must be logged in to do that</p>
        )}
      </button>
    </>
  );
}

export default CommentLike;
