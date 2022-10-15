import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropsInterface } from "../../interfaces/PropsInterface";
import {
  CategoriesInterface,
  CategoriesType,
} from "../../interfaces/CategoriesInterface";
import styles from "./BlogForm.module.scss";
import { Icon } from "@iconify/react";
import CategoryCreate from "../CategoryCreate/CategoryCreate";

function BlogForm(props: PropsInterface) {
  const { formName, blogpostTitle, blogpostId } = props;
  const [authorBlogData, setAuthorBlogData] = useState<any>({
    title: "",
    imageUrl: "",
    body: "",
  });
  const [categoriesData, setCategoriesData] = useState<CategoriesType | null>(
    null
  );
  const [checked, setChecked] = useState([""]);
  const navigate = useNavigate();

  useEffect(() => {
    if (formName === "authorEditForm") {
      (async () => {
        const res = await fetch(
          `https://the-blog-backend.onrender.com/blog/${blogpostTitle}`
        );
        const resData = await res.json();
        setAuthorBlogData({
          title: resData.title,
          imageUrl: resData.image_url,
          body: resData.content,
        });
      })();
    }
    (async () => {
      const res = await fetch("https://the-blog-backend.onrender.com/category");
      const resData = await res.json();
      setCategoriesData(resData);
    })();
  }, []);

  function handleOnChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let list = [...checked];
    const target = (event.target as HTMLInputElement).checked;
    if (target) {
      list = [...checked, event.target.value];
    } else {
      list.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(list);
    setAuthorBlogData({
      ...authorBlogData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const filtered = checked.filter((e) => e !== "");
    const formData = {
      title: authorBlogData.title,
      image_url: authorBlogData.imageUrl,
      content: authorBlogData.body,
      categoryIds: [...filtered],
    };
    if (formName === "authorCreateForm") {
      await fetch("https://the-blog-backend.onrender.com/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
    } else if (formName === "authorEditForm") {
      await fetch(`https://the-blog-backend.onrender.com/blog/${blogpostId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
    }

    setAuthorBlogData({
      title: "",
      imageUrl: "",
      body: "",
    });
    navigate("/author/view");
  }

  function handleDeleteOnClick(event: React.MouseEvent, categoryId: string) {
    event.preventDefault();
    (async () => {
      await fetch(`https://the-blog-backend.onrender.com/category/${categoryId}`, {
        method: "DELETE",
        credentials: "include",
      });
      // const resData = await res.json();
      const response = await fetch("https://the-blog-backend.onrender.com/category");
      const categories = await response.json();
      setCategoriesData!(categories);
    })();
  }
  return (
    <>
      <CategoryCreate setCategoriesData={setCategoriesData} />
      <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={(event) => handleOnChange(event)}
          value={authorBlogData.title}
        />
        <label htmlFor="imageUrl">Image URL </label>
        <input
          type="url"
          name="imageUrl"
          placeholder="https://example.com"
          onChange={(event) => handleOnChange(event)}
          value={authorBlogData.imageUrl}
        />
        <label htmlFor="body">Body</label>
        <textarea
          className={styles.body}
          name="body"
          cols={30}
          rows={20}
          onChange={(event) => handleOnChange(event)}
          value={authorBlogData.body}
        />
        <span>Choose 1 or more Categories</span>

        {categoriesData?.map((e: CategoriesInterface) => {
          return (
            <div key={e.id} className={styles.category}>
              <input
                type="checkbox"
                name={e.name}
                onChange={(event) => handleOnChange(event)}
                value={e.id}
              />
              <label htmlFor={e.name}>{e.name}</label>
              <button
                className={styles.delete}
                data-name="delete"
                onClick={(event) => handleDeleteOnClick(event, e.id)}
              >
                <Icon icon="ant-design:delete-outlined" />
              </button>
            </div>
          );
        })}
        <button type="submit" className={styles.submit}>
          SUBMIT
        </button>
      </form>
    </>
  );
}

export default BlogForm;
