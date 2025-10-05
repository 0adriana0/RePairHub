import styles from "../styles/Button.module.css";

export default function Button({ onClick, children, type = "button", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.button}
    >
      {children}
    </button>
  );
}