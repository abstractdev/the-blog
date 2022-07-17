import { Icon } from "@iconify/react";
import { BlogDataInterface } from "../../interfaces/BlogData";
import { PropsInterface } from "../../interfaces/PropsInterface";
import styles from "./AuthorViewForm.module.scss";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function AuthorViewForm(props: PropsInterface) {
  const { authorBlogpostData, setAuthorBlogpostData } = props;
  const { user } = useContext(AuthContext);

  function handleOnClick(event: React.MouseEvent, blogpostId: string) {
    event.preventDefault();
    if (event !== null && event.target instanceof HTMLElement) {
      switch (event.target.dataset.name) {
        case "yes":
          (async () => {
            await fetch(`https://a-blog-api.herokuapp.com/blog/${blogpostId}`, {
              method: "PUT",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ is_published: true }),
            });
            resetBlogpostState();
          })();
          break;
        case "no":
          (async () => {
            await fetch(`https://a-blog-api.herokuapp.com/blog/${blogpostId}`, {
              method: "PUT",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ is_published: false }),
            });
            resetBlogpostState();
          })();
          break;
        case "delete":
          (async () => {
            await fetch(`https://a-blog-api.herokuapp.com/blog/${blogpostId}`, {
              method: "DELETE",
              credentials: "include",
            });
            resetBlogpostState();
          })();
          break;
        default:
          break;
      }
    }
  }

  function resetBlogpostState() {
    (async () => {
      //fetch all blogposts
      const res = await fetch("https://a-blog-api.herokuapp.com/blog");
      const resData = await res.json();
      setAuthorBlogpostData!(
        resData?.filter((e: BlogDataInterface) => e.user_id === user.id)
      );
    })();
  }

  return (
    <>
      {authorBlogpostData?.map((e) => {
        return (
          <form key={e.id} className={styles["view-post-container"]}>
            {e.is_published ? (
              <Link to={`/${e.title}`} className="hFlex">
                <h3 className={styles.title}>{e.title}</h3>
                <Icon icon="akar-icons:link-chain" />
              </Link>
            ) : (
              <h3 className={styles.title}>{e.title}</h3>
            )}
            <div className={styles["bottom-container"]}>
              <div className={styles["publish-container"]}>
                <span>Publish?</span>
                <div className="vFlex">
                  <button
                    className={
                      e.is_published ? styles["yes-border"] : styles["yes"]
                    }
                    data-name="yes"
                    onClick={(event) => handleOnClick(event, e.id)}
                  >
                    Yes
                  </button>
                  <button
                    className={
                      !e.is_published ? styles["no-border"] : styles["no"]
                    }
                    data-name="no"
                    onClick={(event) => handleOnClick(event, e.id)}
                  >
                    No
                  </button>
                </div>
              </div>
              <div className={styles["icon-container"]}>
                <Link
                  to={`/author/edit/${e.title}/${e.id}`}
                  className={styles.icon}
                  data-name="edit"
                >
                  <Icon icon="ant-design:edit-outlined" />
                  Edit
                </Link>
                <button
                  className={styles.icon}
                  data-name="delete"
                  onClick={(event) => handleOnClick(event, e.id)}
                >
                  <Icon icon="ant-design:delete-outlined" />
                  Del
                </button>
              </div>
            </div>
          </form>
        );
      })}
    </>
  );
}

export default AuthorViewForm;
