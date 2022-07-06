import styles from "./Footer.module.scss";
import github from "../../assets/images/GitHub-Mark-32px.png";

function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/abstractdev"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={github} alt="github icon" />
        abstractdev
      </a>
    </footer>
  );
}

export default Footer;
