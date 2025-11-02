import styles from "../styles/ProfilZakaznik.module.css"
import ProfilHeader from '../components/ProfilHeader'
import defaultPfp from '../img/pfp-default.png'
import { auth, db } from '../firebase'
import { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

const ProfilZakaznik = () => {
  const [pfp] = useState(defaultPfp)
  const [name, setName] = useState('Načítám data...')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('Načítám data...')
  const [location, setLocation] = useState('Načítám data...')

  const [nameChanging, setNameChanging] = useState(false)
  const [emailChanging, setEmailChanging] = useState(false)
  const [locationChanging, setLocationChanging] = useState(false)

  const [nameInput, setNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [locationInput, setLocationInput] = useState('')
    const navigate = useNavigate()
  const handleNameChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const [first, last] = nameInput.split(' ')
      setName(first || name)
      setLastName(last || '')
      setNameChanging(false)
    }
    if (e.key === 'Escape') setNameChanging(false)
  }
  const handleLocationChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setLocation(locationInput || location)
      setLocationChanging(false)
    }
    if (e.key === 'Escape') setLocationChanging(false)
  }
  const handleEmailChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const valid = /\S+@\S+\.\S+/.test(emailInput)
      if (valid) {
        setEmail(emailInput)
        setEmailChanging(false)
      } else {
        alert('Neplatný email')
      }
    }
    if (e.key === 'Escape') setEmailChanging(false)
  }
  const saveChanges = async () => {
    const user = auth.currentUser
    if (!user) {
      alert("Nikdo není přihlášen")
      return
    }
    try {
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, { name, lastName, email, location })
      alert("Změny byly úspěšně uloženy ✅")
    } catch (err) {
      alert("Chyba při ukládání: " + err.message)
    }
  }
  useEffect(() => {
    const loadData = async () => {
      const user = auth.currentUser
      if (!user) return 

      try {
        const userRef = doc(db, 'users', user.uid)
        const snap = await getDoc(userRef)
        if (snap.exists()) {
          const data = snap.data()
          setName(data.name || '')
          setLastName(data.lastName || '')
          setEmail(data.email || '')
          setLocation(data.location || '')
        }
      } catch (err) {
        alert("Chyba při načítání: " + err.message)
      }
    }

    loadData()
  }, [])

  return (
    <div className={styles.profilZakaznikAll}>
      <ProfilHeader nadpisText='Upravit profil' />

      <div className={styles.profilZakaznik}>
        <img src={pfp} alt="Profilová fotka" />

        <form>
          <button className={styles.role} onClick={()=> navigate('/profil-zakaznik/prispevky')} type="button">Moje Příspěvky</button>
          <p className={styles.labelProfile}>Jméno a příjmení</p>
          <p
            onClick={() => setNameChanging(true)}
            className={nameChanging ? styles.inactive : styles.informace}
          >
            {name + ' ' + lastName}
          </p>
          <input
            type="text"
            placeholder="Nové jméno a příjmení"
            className={!nameChanging ? styles.inactive : styles.informace}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={handleNameChange}
          />

          <p className={styles.labelProfile}>Lokace</p>
          <p
            onClick={() => setLocationChanging(true)}
            className={locationChanging ? styles.inactive : styles.informace}
          >
            {location}
          </p>
          <input
            type="text"
            placeholder="Nová lokace"
            className={!locationChanging ? styles.inactive : styles.informace}
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={handleLocationChange}
          />

          <p className={styles.labelProfile}>Email</p>
          <p
            onClick={() => setEmailChanging(true)}
            className={emailChanging ? styles.inactive : styles.informace}
          >
            {email}
          </p>
          <input
            type="email"
            placeholder="Nový email"
            className={!emailChanging ? styles.inactive : styles.informace}
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onKeyDown={handleEmailChange}
          />

          <button className={styles.role} type="button">Výběr role</button>
          <Button onClick={saveChanges}>Uložit změny</Button>
        </form>
      </div>
    </div>
  )
}

export default ProfilZakaznik
