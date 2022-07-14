import { Icon } from "@iconify/react";
import { PropsInterface } from "../../interfaces/PropsInterface";
import { formatDate, formatTitle } from "../../util/helperFunctions";
import styles from "./BlogpostCard.module.scss";
import BlogpostLike from "../BlogpostLike/BlogpostLike";

function BlogpostCard(props: PropsInterface) {
  const { blogpostData, blogpostTitle } = props;

  return (
    <div className={styles.blogpost}>
      <div className={styles.header}>
        <div className={styles.top}>
          <h2>{formatTitle(blogpostTitle)}</h2>
        </div>
        <div className={styles.bottom}>
          <div className={styles.date}>
            <Icon icon="ant-design:calendar-outlined" />
            <span>{formatDate(blogpostData?.created_at)}</span>
          </div>
          <div className={styles.name}>
            <Icon icon="ant-design:user-outlined" />
            <span>{`${blogpostData?.user.first_name} ${blogpostData?.user.last_name}`}</span>
          </div>
          <BlogpostLike
            blogpostId={blogpostData?.id}
            blogpostTitle={blogpostTitle}
          />
        </div>
      </div>
      <img src={blogpostData?.image_url} alt="blogpost" />
      <main>
        <p className={styles.text}>{blogpostData?.content}</p>
      </main>
    </div>
  );
}

export default BlogpostCard;
