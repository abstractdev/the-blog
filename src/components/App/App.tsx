import { Outlet, useLocation } from "react-router-dom";
import styles from "./App.module.scss";
import Categories from "../Categories/Categories";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useEffect, useState } from "react";
import {
  BlogDataArrayType,
  BlogDataInterface,
} from "../../interfaces/BlogData";
import { AuthContext, defaultUser } from "../../contexts/AuthContext";
import { PropsInterface } from "../../interfaces/PropsInterface";
import { CategoriesType } from "../../interfaces/CategoriesInterface";

function App(props: PropsInterface) {
  const [blogData, setBlogData] = useState<BlogDataArrayType | null>(null);
  const [categorizedBlogData, setCategorizedBlogData] =
    useState<BlogDataArrayType | null>(null);
  const [user, setUser] = useState(defaultUser);
  const [categoryData, setCategoryData] = useState<CategoriesType | null>(null);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const res = await fetch("https://the-blog-backend.onrender.com/users", {
        method: "GET",
        credentials: "include",
      });
      const resData = await res.json();
      if (resData) {
        setUser({ ...resData, isLoggedIn: true });
      }
    })();
    (async () => {
      const res = await fetch("https://the-blog-backend.onrender.com/category");
      const resData = await res.json();
      setCategoryData(resData);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      //fetch all blogposts
      const res = await fetch("https://the-blog-backend.onrender.com/blog");
      const resData = await res.json();
      //filter for published posts
      const filtered = resData.filter((e: BlogDataInterface) => e.is_published);
      //add comment quantity property for each blogpost
      filtered.forEach((e: BlogDataInterface) => {
        e.commentQt = e.comments.length;
        e.blogpostLikesQt = e.blogpost_likes.length;
      });
      filtered.sort((a: BlogDataInterface, b: BlogDataInterface) => {
        return +new Date(b.created_at) - +new Date(a.created_at);
      });
      setBlogData(filtered);
    })();
  }, [location]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className={styles.App}>
        <Header
          categorizedBlogData={categorizedBlogData}
          setCategorizedBlogData={setCategorizedBlogData}
        />
        <Categories
          blogData={blogData}
          setCategorizedBlogData={setCategorizedBlogData}
          categoryData={categoryData}
        />
        <Main>
          <Outlet context={[blogData, categorizedBlogData, categoryData]} />
        </Main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
