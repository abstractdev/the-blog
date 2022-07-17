import styles from "./Categories.module.scss";
import { PropsInterface } from "../../interfaces/PropsInterface";
import { Link } from "react-router-dom";
import { BlogDataInterface } from "../../interfaces/BlogData";
import useMediaQuery from "../../hooks/useGetMediaQuery";
import { Icon } from "@iconify/react";
import { useState } from "react";
import TestAccountButton from "../TestAccountButton/TestAccountButton";

function Categories(props: PropsInterface) {
  const { blogData, setCategorizedBlogData, categoryData } = props;
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [categoriesIsOpen, setCategoriesIsOpen] = useState(false);

  function handleCategoryClick(event: React.MouseEvent) {
    const filtered = blogData!.filter((e: BlogDataInterface) => {
      if (event !== null && event.target instanceof HTMLElement) {
        return event.target.dataset.category === e.categories[0].name;
      }
    });
    setCategorizedBlogData!(filtered);
  }

  function handleSetDropdownIsOpen(event: React.MouseEvent) {
    setCategoriesIsOpen((prev) => !prev);
  }

  return (
    <>
      {isDesktop ? (
        <div className={styles["category-container"]}>
          <div className={styles["category-links"]}>
            {categoryData?.map((e: any) => (
              <Link
                to="/"
                className={styles["category-link"]}
                key={e.id}
                data-category={e.name}
                onClick={(event) => handleCategoryClick(event)}
              >
                {e.name}
              </Link>
            ))}
          </div>
          <div className={styles["test-container"]}>
            <TestAccountButton buttonName="Test User" />
            <TestAccountButton buttonName="Test Author" />
          </div>
        </div>
      ) : (
        <div className={styles["category-container"]}>
          <div
            className={styles["category-dropdown-container"]}
            onClick={(event) => handleSetDropdownIsOpen(event)}
          >
            Categories
            <Icon icon="ant-design:down-outlined" />
            <div className={styles["category-dropdown"]}>
              {categoriesIsOpen &&
                categoryData?.map((e: any) => (
                  <Link
                    to="/"
                    className={styles["category-dropdown-link"]}
                    key={e.id}
                    data-category={e.name}
                    onClick={(event) => handleCategoryClick(event)}
                  >
                    {e.name}
                  </Link>
                ))}
            </div>
          </div>
          <div className={styles["test-container"]}>
            <TestAccountButton buttonName="Test User" />
            <TestAccountButton buttonName="Test Author" />
          </div>
        </div>
      )}
    </>
  );
}

export default Categories;
