import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CommentsInterface } from "../../interfaces/Comments";
import { formatShortDate } from "../../util/helperFunctions";
import styles from "./ProfileCard.module.scss";

function CommentHistory() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles["comments-container"]}>
      {!user?.comments?.length ? (
        <div className="light-text">Nothing here</div>
      ) : (
        user?.comments?.map((e: CommentsInterface) => (
          <span key={e.id} className={styles["comment-history"]}>
            <small>{formatShortDate(e.created_at)}</small>
            <br />
            {e.content}
          </span>
        ))
      )}
    </div>
  );
}

export default CommentHistory;
