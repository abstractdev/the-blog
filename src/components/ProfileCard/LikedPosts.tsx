import { Icon } from "@iconify/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { BlogpostLikes } from "../../interfaces/ProfileData";
import styles from "./ProfileCard.module.scss";

function LikedPosts() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles["liked-posts-container"]}>
      {!user?.blogpost_likes?.length ? (
        <div className="light-text">Nothing here</div>
      ) : (
        user?.blogpost_likes?.map((e: BlogpostLikes) => (
          <Link
            key={e.id}
            to={`/${e.blogpost_title}`}
            className={styles["blogpost-link"]}
          >
            {e.blogpost_title}
            <Icon icon="akar-icons:link-chain" />
          </Link>
        ))
      )}
    </div>
  );
}

export default LikedPosts;
