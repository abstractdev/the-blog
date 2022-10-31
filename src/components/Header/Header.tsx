import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { PropsInterface } from "../../interfaces/PropsInterface";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import { Icon } from "@iconify/react";

function Header(props: PropsInterface) {
  const { setCategorizedBlogData } = props;
  const { user, setUser } = useContext(AuthContext);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  function handleSetDropdownIsOpen(event: React.MouseEvent) {
    setDropdownIsOpen((prev) => !prev);
  }

  function handleLogOut() {
    (async () => {
      await fetch("https://a-blog-api3.herokuapp.com/users/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser!({ ...user, isLoggedIn: false });
      setCategorizedBlogData!(null);
    })();
  }

  return (
    <header className={styles.header}>
      <Link to="/" onClick={() => setCategorizedBlogData!(null)}>
        <h1 className={styles["blog-name"]}>The Blog</h1>
      </Link>
      {!user.isLoggedIn ? (
        <nav className={styles.nav}>
          <Link to="/login" className={styles["login-link"]}>
            Log In
          </Link>
          <div
            className={styles["signup-container"]}
            onClick={(event) => handleSetDropdownIsOpen(event)}
          >
            Sign Up
            <Icon icon="ant-design:down-outlined" />
            {dropdownIsOpen && (
              <div className={styles["dropdown-container"]}>
                <Link to="/signup/user" className={styles["signup-link"]}>
                  User
                </Link>
                <Link to="/signup/author" className={styles["signup-link"]}>
                  Author
                </Link>
              </div>
            )}
          </div>
        </nav>
      ) : (
        <nav className={styles.nav}>
          <Link to="/profile" className={styles["profile-link"]}>
            Profile
          </Link>
          <Link
            to="/"
            className={styles["logout-link"]}
            onClick={() => handleLogOut()}
          >
            Log Out
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
