import BlogCard from "../../components/BlogCard/BlogCard";
import styles from "./Home.module.scss";
import { OutletContextArrayType } from "../../interfaces/OutletContext";
import { useOutletContext } from "react-router-dom";

function Home() {
  const [blogData, categorizedBlogData] =
    useOutletContext<OutletContextArrayType>();

  return (
    <div className={styles.home}>
      {!categorizedBlogData && <BlogCard>{blogData}</BlogCard>}
      {categorizedBlogData && <BlogCard>{categorizedBlogData}</BlogCard>}
    </div>
  );
}

export default Home;
