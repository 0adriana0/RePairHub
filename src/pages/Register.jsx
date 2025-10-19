import { useState } from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Register.module.css";
import Button from "../components/Button";
import {doc, setDoc } from "firebase/firestore";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tel, setTel] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = {email,name,lastName,tel,date}
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user
      await setDoc(doc(db, 'users', user.uid), {
        ...newUser,
        id: user.uid
      })
      navigate("/location-setting");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>SIGN UP</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="email">Email</label>
        <input
        id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="name">Jméno</label>
        <input
        id="name"
          type="text"
          placeholder="Honza"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="lastName">Příjmení</label>
        <input
        id="lastName"
          type="text"
          placeholder="Novák"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label htmlFor="password">Heslo</label>
        <input
        id="password"
          type="password"
          placeholder="•••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="tel">Tel. číslo</label>
        <input
        id="tel"
          type="text"
          placeholder="+420 111 222 333"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          required
        />

    <label htmlFor="date">Datum narození</label>
        <input
        id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{marginBottom: "50px"}}
        />

        <Button type="submit">Pokračovat</Button>
      </form>
      <div className={styles.login}>
      <p>Už máte účet?</p>
      <p onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "#4A7E79" }}>Přihlašte se zde</p>
      </div>
    </div>
  );
}