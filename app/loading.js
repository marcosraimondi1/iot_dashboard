import styles from "./styles.module.css";
export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles["custom-loader"]}></div>
    </div>
  );
}
