import { useParams } from "react-router-dom";
import AuthorEditForm from "../../components/AuthorEditForm/AuthorEditForm";
import styles from "./AuthorEdit.module.scss";

function AuthorEdit() {
  const params = useParams();
  const { blogpostTitle, blogpostId } = params;
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Edit Blog Post</h2>
      <AuthorEditForm blogpostTitle={blogpostTitle} blogpostId={blogpostId} />
    </div>
  );
}

export default AuthorEdit;
