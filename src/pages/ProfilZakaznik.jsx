import styles from "../styles/ProfilZakaznik.module.css"
import ProfilHeader from '../components/ProfilHeader'
import defaultPfp from '../img/pfp-default.png'
import { auth,db } from '../firebase'
import { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ChangeRoleBtn from '../components/ChangeRoleBtn'

const ProfilZakaznik = () => {
  const navigate = useNavigate()

  const [pfp] = useState(defaultPfp)
  const [name, setName] = useState('Načítám data...')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('Načítám data...')
  const [location, setLocation] = useState('Načítám data...')

  const [nameClass, setNameClass] = useState('informace')
  const [lastNameClass, setLastNameClass] = useState('informace')
  const [locationClass, setLocationClass]= useState('informace')
  const [emailClass, setEmailClass]= useState('informace')

  const changeName = (e)=>{
    e.preventDefault()
    setName(e.target.value)
    setNameClass('changed-info')
  }
  const changeLastName = (e)=>{
    e.preventDefault()
    setLastName(e.target.value)
    setLastNameClass('changed-info')
  }
  const changeLocation = (e)=>{
    e.preventDefault()
    setLocation(e.target.value)
    setLocationClass('changed-info')
  }
  const changeEmail = (e)=>{
    e.preventDefault()
    setEmail(e.target.value)
    setEmailClass('changed-info')
  }

  const saveChanges = async ()=>{
    try {
      const user = auth.currentUser
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, {name, lastName, location, email})  
    } catch(err) {alert(err.message)}
    setNameClass('informace')
    setLastNameClass('informace')
    setLocationClass('informace')
    setEmailClass('informace')
  }

  useEffect(()=>{
    const user = auth.currentUser
      user || alert("Nikdo není přihlášen")
      user || navigate('/login')
      async function loadData(){
        const user = auth.currentUser
        const userRef = doc(db, 'users', user.uid)
        await updateDoc(userRef, {actualRole: 'zákazník'})
        const userData = (await getDoc(userRef)).data()
        const {name, lastName, email, location} = userData
        setName(name)
        setLastName(lastName)
        setEmail(email)
        setLocation(location)
      }
    try{
      loadData()
    } catch(err) {alert(err.message)}
  }, [navigate])

  return (<div className={styles.profilZakaznikAll}>
    <ProfilHeader nadpisText='Upravit profil' />
      <div className={styles.profilZakaznik}>
          <img src={pfp} alt="" />
          <form onSubmit={(e)=>e.preventDefault()}>
            <button className={styles.role} onClick={()=> navigate('/profil-zakaznik/prispevky')} type="button">Moje Příspěvky</button>
            <p className={styles.labelProfile}>Jméno</p>
            <input 
              type="text"
              value={name}
              onChange={(e)=>changeName(e)}
              className={styles[nameClass]}
            /> 
            <p className={styles.labelProfile}>Příjmení</p>
            <input 
              type="text"
              value={lastName}
              onChange={(e)=>changeLastName(e)}
              className={styles[lastNameClass]}
            />
            <p className={styles.labelProfile}>Lokace</p>
            <input 
              type="text" 
              value={location}
              onChange={(e)=>changeLocation(e)}
              className={styles[locationClass]}
            />
            <p className={styles.labelProfile}>Kontaktní email</p>
            <input 
              type="text"
              value={email}   
              onChange={(e)=>changeEmail(e)}
              className={styles[emailClass]}
            />
            <ChangeRoleBtn />
            <Button onClick={()=>saveChanges()}>Uložit změny</Button>
          </form>
      </div>
    </div>
  )
}

export default ProfilZakaznik

  //       <form>
  //         <button className={styles.role} onClick={()=> navigate('/profil-zakaznik/prispevky')} type="button">Moje Příspěvky</button>
  //         <p className={styles.labelProfile}>Jméno a příjmení</p>
  //         <p
  //           onClick={() => setNameChanging(true)}
  //           className={nameChanging ? styles.inactive : styles.informace}
  //         >
  //           {name + ' ' + lastName}
  //         </p>
  //         <input
  //           type="text"
  //           placeholder="Nové jméno a příjmení"
  //           className={!nameChanging ? styles.inactive : styles.informace}
  //           value={nameInput}
  //           onChange={(e) => setNameInput(e.target.value)}
  //           onKeyDown={handleNameChange}
  //         />

  //         <p className={styles.labelProfile}>Lokace</p>
  //         <p
  //           onClick={() => setLocationChanging(true)}
  //           className={locationChanging ? styles.inactive : styles.informace}
  //         >
  //           {location}
  //         </p>
  //         <input
  //           type="text"
  //           placeholder="Nová lokace"
  //           className={!locationChanging ? styles.inactive : styles.informace}
  //           value={locationInput}
  //           onChange={(e) => setLocationInput(e.target.value)}
  //           onKeyDown={handleLocationChange}
  //         />

  //         <p className={styles.labelProfile}>Email</p>
  //         <p
  //           onClick={() => setEmailChanging(true)}
  //           className={emailChanging ? styles.inactive : styles.informace}
  //         >
  //           {email}
  //         </p>
  //         <input
  //           type="email"
  //           placeholder="Nový email"
  //           className={!emailChanging ? styles.inactive : styles.informace}
  //           value={emailInput}
  //           onChange={(e) => setEmailInput(e.target.value)}
  //           onKeyDown={handleEmailChange}
  //         />

  //         <button className={styles.role} type="button">Výběr role</button>
  //         <Button onClick={saveChanges}>Uložit změny</Button>
  //       </form>
  //     </div>
  //   </div>
  // )

