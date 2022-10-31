import styles from "./BlogpostLike.module.scss";
import { PropsInterface } from "../../interfaces/PropsInterface";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { BlogpostLikes } from "../../interfaces/ProfileData";

function BlogpostLike(props: PropsInterface) {
  const { user } = useContext(AuthContext);
  const { blogpostId, blogpostTitle } = props;
  const [blogpostLikesQt, setBlogpostLikesQt] = useState(0);
  const [loginReqMsgIsVisible, setLoginReqMsgIsVisible] = useState(false);
  const [showLikedIcon, setshowLikedIcon] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://a-blog-api3.herokuapp.com/blog/${blogpostTitle}`
      );
      const resData = await res.json();
      setBlogpostLikesQt(resData?.blogpost_likes?.length);
      const find = resData?.blogpost_likes?.find(
        (e: BlogpostLikes) => e.userId === user.id
      );
      find ? setshowLikedIcon(true) : setshowLikedIcon(false);
    })();
  }, []);

  function handleOnClick(event: React.MouseEvent) {
    event.preventDefault();
    (async () => {
      // fetch single blogpost
      const res = await fetch(
        `https://a-blog-api3.herokuapp.com/blog/${blogpostTitle}`
      );
      const resData = await res.json();
      // check if blogpost's userid matches userid to prevent author from liking own post
      if (resData.user_id === user.id) {
        return;
      }
      //find an existing like instance
      const likedEntry = resData.blogpost_likes.find(
        (e: BlogpostLikes) =>
          e.blogpostId === blogpostId && e.userId === user.id
      );
      //if it exists, delete it
      if (likedEntry && user.isLoggedIn) {
        (async () => {
          await fetch(
            `https://a-blog-api3.herokuapp.com/blogpostLike/${blogpostId}`,
            {
              method: "DELETE",
              credentials: "include",
            }
          );
          setBlogpostLikesQt((prev) => prev - 1);
          setshowLikedIcon(false);
        })();
        //if it doesn't exist, create one
      } else if (!likedEntry && user.isLoggedIn) {
        (async () => {
          const res = await fetch(
            `https://a-blog-api3.herokuapp.com/blogpostLike/${blogpostId}`,
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ blogpost_title: blogpostTitle }),
            }
          );
          setBlogpostLikesQt((prev) => prev + 1);
          setshowLikedIcon(true);
        })();
      } else {
        setLoginReqMsgIsVisible(true);
        setTimeout(() => {
          setLoginReqMsgIsVisible(false);
        }, 2000);
      }
    })();
  }

  return (
    <button
      className={styles["like-container"]}
      onClick={(event) => handleOnClick(event)}
    >
      {showLikedIcon ? (
        <>
          <Icon
            icon="ant-design:heart-filled"
            color="red"
            className={styles.like}
          />
          <span>{blogpostLikesQt}</span>
        </>
      ) : (
        <>
          <Icon
            icon="ant-design:heart-outlined"
            color="red"
            className={styles.like}
          />
          <span>{blogpostLikesQt}</span>
        </>
      )}
      {loginReqMsgIsVisible && (
        <p className={styles.error}>You must be logged in to do that</p>
      )}
    </button>
  );
}

export default BlogpostLike;
