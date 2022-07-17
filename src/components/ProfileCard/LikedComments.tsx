import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CommentLikes } from "../../interfaces/ProfileData";
import styles from "./ProfileCard.module.scss";

function LikedComments() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles["liked-comments-container"]}>
      {!user?.comment_likes?.length ? (
        <div className="light-text">Nothing here</div>
      ) : (
        user?.comment_likes?.map((e: CommentLikes) => (
          <span key={e.id} className={styles["liked-comments"]}>
            {e.comment_content}
            <br />
            <small>{`by: ${e.created_by}`}</small>
          </span>
        ))
      )}
    </div>
  );
}

export default LikedComments;
