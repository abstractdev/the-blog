import styles from "./Main.module.scss";
import { PropsInterface } from "../../interfaces/PropsInterface";

function Main(props: PropsInterface) {
  return <main className={styles.main}>{props.children}</main>;
}

export default Main;
