import styles from "./FormCard.module.scss";
import { PropsInterface } from "../../interfaces/PropsInterface";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { validate } from "../../util/validate";

function FormCard(props: PropsInterface) {
  const navigate = useNavigate();
  const { formTitle } = props;
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [validationError, setValidationError] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      validate(formTitle, userFormData, setValidationError) ===
      "validationError"
    ) {
      return;
    } else if (
      formTitle === "USER SIGN UP" &&
      userFormData.password === userFormData.passwordConfirmation
    ) {
      const signupData = {
        username: userFormData.username,
        password: userFormData.password,
        passwordConfirmation: userFormData.passwordConfirmation,
        role: "user",
      };
      await fetch("https://the-blog-backend.onrender.com/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      navigate("/login");
    } else if (formTitle === "LOG IN") {
      const loginData = {
        username: userFormData.username,
        password: userFormData.password,
      };
      const res = await fetch("https://the-blog-backend.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      const resData = await res.json();
      if (resData.message === "Incorrect Username or Password") {
        setValidationError(resData.message);
      } else {
        setUser!({ ...user, isLoggedIn: true });
        navigate("/profile");
      }
    } else if (formTitle === "AUTHOR SIGN UP") {
      const signupData = {
        first_name: userFormData.firstName,
        last_name: userFormData.lastName,
        username: userFormData.username,
        password: userFormData.password,
        passwordConfirmation: userFormData.passwordConfirmation,
        role: "author",
      };
      await fetch("https://the-blog-backend.onrender.com/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      navigate("/login");
    }

    setUserFormData({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    });
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserFormData({
      ...userFormData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <form
      className={
        styles[`${formTitle === "AUTHOR SIGN UP" ? "big" : "form-card"}`]
      }
      onSubmit={(event) => handleSubmit(event)}
    >
      <h2 className={styles.title}>{formTitle}</h2>
      {formTitle === "AUTHOR SIGN UP" && (
        <>
          <input
            type="text"
            name="firstName"
            placeholder="First Name*"
            value={userFormData.firstName}
            onChange={(event) => handleOnChange(event)}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name*"
            value={userFormData.lastName}
            onChange={(event) => handleOnChange(event)}
          />
        </>
      )}
      <input
        type="text"
        name="username"
        placeholder="Username*"
        value={userFormData.username}
        onChange={(event) => handleOnChange(event)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password*"
        value={userFormData.password}
        onChange={(event) => handleOnChange(event)}
      />
      {(formTitle === "USER SIGN UP" || formTitle === "AUTHOR SIGN UP") && (
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password*"
          value={userFormData.passwordConfirmation}
          onChange={(event) => handleOnChange(event)}
        />
      )}
      {validationError && (
        <span className={styles["form-error"]}>{validationError}</span>
      )}
      <button type="submit" className={styles.submit}>
        SUBMIT
      </button>
    </form>
  );
}

export default FormCard;
