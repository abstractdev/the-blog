import { formatDate, formatTitle } from "../../util/helperFunctions";
import styles from "./BlogCard.module.scss";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { PropsInterface } from "../../interfaces/PropsInterface";
import BlogpostLike from "../BlogpostLike/BlogpostLike";

function BlogCard(props: PropsInterface) {
  const { children } = props;

  return (
    <>
      {children?.map((e: any) => {
        return (
          <div key={e.id} className={styles["blog-card"]}>
            <Link to={`/${e.title}`}>
              <img src={e.image_url} alt="blog thumbnail" />
            </Link>
            <main className={styles["main-content"]}>
              <div className={styles["top-content"]}>
                <div className={styles["top-text"]}>
                  <span>{e.categories[0].name}</span>
                  <span>➤</span>
                  <span>{formatDate(e.created_at)}</span>
                </div>
                <BlogpostLike blogpostId={e.id} blogpostTitle={e.title} />
              </div>
              <Link to={`/${e.title}`}>
                <h2 className={styles.title}>
                  {formatTitle(e.title.toUpperCase())}
                </h2>
              </Link>
              <span
                className={styles.name}
              >{`➤ ${e.user.first_name} ${e.user.last_name}`}</span>
              <p className={styles["text-content"]}>{e.content}</p>
              <div className={styles["link-content"]}>
                <Link to={`/${e.title}`} className={styles["readmore-link"]}>
                  READ MORE
                </Link>
                <div className={styles["comment-container"]}>
                  <Icon icon="bx:comment" className={styles.comment} />
                  <span>{e.commentQt}</span>
                </div>
              </div>
            </main>
          </div>
        );
      })}
    </>
  );
}

export default BlogCard;
