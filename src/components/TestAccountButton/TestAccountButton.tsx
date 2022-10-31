import styles from "./TestAccountButton.module.scss";
import { useNavigate } from "react-router-dom";
import { PropsInterface } from "../../interfaces/PropsInterface";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { Icon } from "@iconify/react";

function TestAccountButton(props: PropsInterface) {
  const { buttonName } = props;
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLoginClick() {
    let loginData = { username: "", password: "" };
    if (buttonName === "Test Author") {
      loginData.username = "TestAuthor";
      loginData.password = "testauthor";
    } else if (buttonName === "Test User") {
      loginData.username = "TestUser";
      loginData.password = "testuser";
    }
    await fetch("https://a-blog-api3.herokuapp.com/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginData),
    });
    setUser!({ ...user, isLoggedIn: true });
    navigate("/profile");
  }

  return (
    <button
      className={styles["test-account-button"]}
      onClick={() => handleLoginClick()}
    >
      <Icon className={styles.icon} icon="healthicons:ui-user-profile" />
      {buttonName}
    </button>
  );
}

export default TestAccountButton;
