import './ProfilOpravar.css'
import ProfilHeader from '../components/ProfilHeader'
import defaultPfp from '../img/pfp-default.png'
import { auth,db } from '../firebase'
import { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const ProfilOpravar = () => {
  const navigate = useNavigate()

  // Informace z databáze
  const [pfp] = useState(defaultPfp)
  const [name, setName] = useState('Načítám data...')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('Načítám data...')
  const [location, setLocation] = useState('Načítám data...')
  const [bio, setBio] = useState('Načítám data...')

  // Podmínky pro zobrazení inputu pro změnu něčeho
  const [nameChanging, setNameChanging] = useState(false)
  const [emailChanging, setEmailChanging] = useState(false)
  const [locationChanging, setLocationChanging] = useState(false)

  // Změny
  const [nameALastNameInput, setNameALastNameInput] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newLocation, setNewLocation] = useState('')

  // Změny na profilu
  const changeNameAndLastName = (e)=>{
    if(e.key === 'Enter'){
      e.preventDefault()
      const namesArr = nameALastNameInput.split(' ')
      setName(namesArr[0])
      setLastName(namesArr[1])
      setNameChanging(false)
    }
    if(e.key === 'Escape'){
      setNameChanging(false)
    }
  }

  const changeLocation = (e)=>{
    if(e.key === 'Enter'){
      e.preventDefault()
      setLocation(newLocation)
      setLocationChanging(false)
    }
    if(e.key === 'Escape'){
      setLocationChanging(false)
    }
  }

  const changeEmail = (e)=>{
    
    if(e.key === 'Enter'){
      const isValidEmail = ()=>{
        e.preventDefault()
        return /\S+@\S+\.\S+/.test(newEmail)
      }
      if(isValidEmail()){        
        e.preventDefault()
        setEmail(newEmail)
        setEmailChanging(false)
      }
    }
    if(e.key === 'Escape'){
      setEmailChanging(false)
    }
  }

  const changeBio = (e)=>{
    if(e.key ==='Enter'){
       e.preventDefault()
      const user = auth.currentUser
      const userRef = doc(db, 'users', user.uid)
      updateDoc(userRef, {bio: bio})
    } 
  }

  // Uložení nových dat
  const saveChanges = async ()=>{
    
    try {
      const user = auth.currentUser
      user || alert("Nikdo není přihlášen")
      const userRef = doc(db, 'users', user.uid)

      
      
      await updateDoc(userRef, {name, lastName, location, email})  
    } catch(err) {alert(err.message)}
    
  }


  // Načítání dat
  useEffect(()=>{
    const user = auth.currentUser
      user || alert("Nikdo není přihlášen")
      user || navigate('/login')
      async function loadData(){
        const user = auth.currentUser
        const userRef = doc(db, 'users', user.uid)
        const userData = (await getDoc(userRef)).data()
        const {name, lastName, email, location, bio } = userData
        setName(name)
        setLastName(lastName)
        setEmail(email)
        setLocation(location)
        setBio(bio)
      }
    try{
      loadData()
    } catch(err) {alert(err.message)}
    
  },[navigate])

  return (<div className='profil-opravar-all'>
    <ProfilHeader nadpisText='Upravit profil' />
      <div className="profil-opravar">
          <img src={pfp} alt="" />
          <form>
            <p id='top-profile'>Jméno a příjmení</p>
            <p onClick={()=>setNameChanging(true)} className={nameChanging ? 'inactive':'informace'}>{name+' '+lastName}</p>
            <input 
              type="text" 
              placeholder='Nové jméno a příjmení' 
              className={!nameChanging&&'inactive'}
              value={nameALastNameInput}
              onChange={(e)=>setNameALastNameInput(e.target.value)}
              onKeyDown={(e)=>changeNameAndLastName(e)}
            />

            <p>Lokace</p>
            <p onClick={()=>setLocationChanging(true)} className={locationChanging?'inactive':'informace'}>{location}</p>
            <input 
              type="text" 
              placeholder='Nová lokace'
              className={!locationChanging? 'inactive': undefined}
              value={newLocation}
              onChange={(e)=>setNewLocation(e.target.value)}
              onKeyDown={(e)=>changeLocation(e)}
            />

            <p>Email</p>
            <p onClick={()=>setEmailChanging(true)} className={emailChanging?'inactive':'informace'}>{email}</p>
            <input 
              type="email"
              placeholder='Nový email'
              required
              className={!emailChanging?'inactive':undefined}
              value={newEmail}
              onChange={(e)=>setNewEmail(e.target.value)}
              onKeyDown={(e)=>changeEmail(e)}
              />

            <p>Bio</p>
            <input 
              type="text"
              value={bio?bio:''}
              placeholder='Napište něco o sobě'
              onChange={(e)=>setBio(e.target.value)}
              onKeyDown={(e)=>changeBio(e)}
              className='informace'
            />


            <button>Výběr role</button>
            <Button onClick={()=>saveChanges()}>Uložit změny</Button>
          </form>
      </div>
    </div>
  )
}

export default ProfilOpravar