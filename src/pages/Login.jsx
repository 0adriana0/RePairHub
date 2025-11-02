import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate} from "react-router-dom";
import Button from "../components/Button";
import styles from "../styles/Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profil-opravar");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>SIGN IN</h2>
      <form onSubmit={handleLogin}>
        <label className={styles.label} htmlFor="email">Email</label>
        <input className={styles.input}
        id="email"
          type="email"
          placeholder="@"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className={styles.label} htmlFor="password">Heslo</label>
        <input className={styles.input}
        id="password"
          type="password"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{marginBottom: "50px"}}
        />
        <Button className={styles.btn} onClick={() => navigate("/profil-zakaznik")} type="submit">SING IN</Button>
      </form>
      <div className={styles.register}>
      <p>Ještě nemáte účet?</p>
      <p onClick={() => navigate("/register")} style={{ cursor: "pointer", color: "#4A7E79" }}>Zaregistrujte se zde</p>
      </div>
    </div>
  );
}
