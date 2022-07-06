import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { PropsInterface } from "../../interfaces/PropsInterface";

function Header(props: PropsInterface) {
  const { setCategorizedBlogData } = props;

  return (
    <header className={styles.header}>
      <Link to="/" onClick={() => setCategorizedBlogData!(null)}>
        <h1 className={styles["blog-name"]}>The Blog</h1>
      </Link>
      <nav className={styles.nav}>
        <Link to="/login" className={styles["login-link"]}>
          Log In
        </Link>
        <Link to="/signup" className={styles["signup-link"]}>
          Sign Up
        </Link>
      </nav>
    </header>
  );
}

export default Header;
