import { useState } from "react";
import styles from "./CategoryCreate.module.scss";
import { PropsInterface } from "../../interfaces/PropsInterface";

function CategoryCreate(props: PropsInterface) {
  const { setCategoryData } = props;
  const [showCategoryCreateForm, setShowCategoryCreateForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  function handleOnClick(event: React.MouseEvent) {
    event.preventDefault();
    setShowCategoryCreateForm(!showCategoryCreateForm);
  }

  function handleOnSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!categoryName) {
      return;
    }
    (async () => {
      const res = await fetch("https://a-blog-api.herokuapp.com/category", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });
      const response = await fetch("https://a-blog-api.herokuapp.com/category");
      const categories = await response.json();
      setCategoryData!(categories);
      setCategoryName("");
    })();
  }
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setCategoryName(target.value);
  }
  return (
    <div className={styles.container}>
      <button
        className={styles["create-category-button"]}
        onClick={(event) => handleOnClick(event)}
      >
        + Create New Category
      </button>
      {showCategoryCreateForm && (
        <form
          className={styles.form}
          onSubmit={(event) => handleOnSubmit(event)}
        >
          <div className={styles.category}>
            <input
              type="text"
              name="newCategory"
              placeholder="Category Name"
              value={categoryName}
              onChange={(event) => handleOnChange(event)}
            />
            <button type="submit" className={styles.submit}>
              Add
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
export default CategoryCreate;
