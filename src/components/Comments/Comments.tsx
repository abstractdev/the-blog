import styles from "./Comments.module.scss";
import { PropsInterface } from "../../interfaces/PropsInterface";
import { formatDate } from "../../util/helperFunctions";
import CommentLike from "../CommentLike/CommentLike";

function Comments(props: PropsInterface) {
  const { comments, blogpostId } = props;

  return (
    <>
      <h2 className={styles.header}>COMMENTS</h2>
      {comments?.map((e) => {
        return (
          <div key={e.id} className={styles.comments}>
            <div className={styles.top}>
              <div className={styles.left}>
                <h3>{e?.created_by}</h3>
                <span className={styles.date}>{formatDate(e?.created_at)}</span>
              </div>
              <div className={styles.right}>
                <CommentLike
                  commentId={e?.id}
                  commentContent={e?.content}
                  blogpostId={blogpostId}
                  createdBy={e?.created_by}
                />
              </div>
            </div>
            <p>{e?.content}</p>
          </div>
        );
      })}
    </>
  );
}

export default Comments;
