import styles from "../styles/Prispevky.module.css"
import defaultPfp from '../img/pfp-default.png'
import { auth, db } from '../firebase'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const ProfilZakaznik = () => {
  const [pfp, setPfp] = useState(defaultPfp)
    const navigate = useNavigate()

  useEffect(() => {
    const loadProfilePhoto = async () => {
      const user = auth.currentUser
      if (!user) return

      try {
        const userRef = doc(db, 'users', user.uid)
        const snap = await getDoc(userRef)
        if (snap.exists()) {
          const data = snap.data()
          if (data.profilePhotoUrl) {
            setPfp(data.profilePhotoUrl)
          }
        }
      } catch (err) {
        console.error("Chyba při načítání profilu:", err.message)
      }
    }

    loadProfilePhoto()
  }, [])

  return (
    <div className={styles.profilZakaznikAll}>
        <button className={styles.exit} onClick={()=> navigate("/profil-zakaznik")}>ᐸ</button>
        <h2 className={styles.title}>Příspěvky</h2>
        <img
          src={pfp}
          alt="Profilová fotka"
          className={styles.profilZakaznikImg}
        />
        <button className={styles.pridat} onClick={()=> navigate("/pridat")}>Přidat příspěvek</button>
    </div>
  )
}

export default ProfilZakaznik
