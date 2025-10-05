import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import styles from "../styles/Welcome.module.css";
import logo from "../img/logo.png";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img
        src={logo}
        alt="Логотип"
        className={styles.logo}
      />
      <h1 className={styles.slogan}>slogan</h1>
      <Button onClick={() => navigate("/login")}>NEXT</Button>
    </div>
  );
}
