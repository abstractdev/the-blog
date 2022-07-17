import styles from "./ProfileCard.module.scss";
import { Icon } from "@iconify/react";
import { PropsInterface } from "../../interfaces/PropsInterface";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import LikedPosts from "./LikedPosts";
import LikedComments from "./LikedComments";
import CommentsHistory from "./CommentHistory";
import { Link } from "react-router-dom";

function ProfileCard(props: PropsInterface) {
  const { user } = useContext(AuthContext);
  const [likedPostsIsVisible, setLikedPostsIsVisible] = useState(false);
  const [likedCommentsIsVisible, setLikedCommentsIsVisible] = useState(false);
  const [commentsHistoryIsVisible, setCommentsHistoryIsVisible] =
    useState(false);

  function handleClick(event: React.MouseEvent) {
    switch (event.currentTarget.id) {
      case "liked-posts-btn":
        setLikedPostsIsVisible(true);
        setLikedCommentsIsVisible(false);
        setCommentsHistoryIsVisible(false);
        break;
      case "liked-comments-btn":
        setLikedCommentsIsVisible(true);
        setLikedPostsIsVisible(false);
        setCommentsHistoryIsVisible(false);
        break;
      case "comments-history-btn":
        setCommentsHistoryIsVisible(true);
        setLikedCommentsIsVisible(false);
        setLikedPostsIsVisible(false);
        break;
      default:
        break;
    }
  }

  return (
    <div key={user?.id} className={styles["profile-card"]}>
      <div className={styles["username-container"]}>
        <Icon icon="healthicons:ui-user-profile" width="45" height="45" />
        <h2>{user?.username}</h2>
      </div>
      {user.role === "author" && (
        <div className={styles["link-container"]}>
          <Link className={styles.create} to="/author/create">
            <Icon icon="dashicons:welcome-write-blog" />
            Create Blog Post
          </Link>
          <Link className={styles.view} to="/author/view">
            <Icon icon="ant-design:unordered-list-outlined" />
            View Authored Posts
          </Link>
        </div>
      )}
      <div className={styles["btn-container"]}>
        <button
          id="liked-posts-btn"
          onClick={(event) => handleClick(event)}
          className={styles["liked-posts-btn"]}
        >
          Liked Posts
        </button>
        <button
          id="liked-comments-btn"
          onClick={(event) => handleClick(event)}
          className={styles["liked-comments-btn"]}
        >
          Liked Comments
        </button>
        <button
          id="comments-history-btn"
          onClick={(event) => handleClick(event)}
          className={styles["comments-history-btn"]}
        >
          Comment History
        </button>
      </div>
      <div className={styles["content-container"]}>
        {likedPostsIsVisible && <LikedPosts />}
        {likedCommentsIsVisible && <LikedComments />}
        {commentsHistoryIsVisible && <CommentsHistory />}
      </div>
    </div>
  );
}

export default ProfileCard;
