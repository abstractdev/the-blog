import AuthorCreateForm from "../../components/AuthorCreateForm/AuthorCreateForm";
import styles from "./AuthorCreate.module.scss";

function AuthorCreate() {
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Create Blog Post</h2>
      <div className={styles.content}>
        <AuthorCreateForm />
      </div>
    </div>
  );
}

export default AuthorCreate;
