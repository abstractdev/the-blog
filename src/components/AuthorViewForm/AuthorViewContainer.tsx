import styles from "./AuthorViewForm.module.scss";
import { PropsInterface } from "../../interfaces/PropsInterface";

function AuthorViewContainer(props: PropsInterface) {
  const { children } = props;
  return <div className={styles["author-view-container"]}>{children}</div>;
}

export default AuthorViewContainer;
