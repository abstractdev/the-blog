import BlogCard from "../../components/BlogCard/BlogCard";
import styles from "./Home.module.scss";
import { useOutletDataContext } from "../../components/App/App";

function Home() {
  const [blogData, categorizedBlogData] = useOutletDataContext();

  return (
    <div className={styles.home}>
      {!categorizedBlogData && <BlogCard>{blogData}</BlogCard>}
      {categorizedBlogData && <BlogCard>{categorizedBlogData}</BlogCard>}
    </div>
  );
}

export default Home;
