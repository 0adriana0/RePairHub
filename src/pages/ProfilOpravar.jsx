import '../styles/ProfilOpravar.css'
import ProfilHeader from '../components/ProfilHeader'
import defaultPfp from '../img/pfp-default.png'
import { auth,db } from '../firebase'
import { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ChangeRoleBtn from '../components/ChangeRoleBtn'
import pen from '../img/pen.png'
import axios from 'axios'
 
const ProfilOpravar = () => {

  
  const navigate = useNavigate()

  // Informace z databáze
  const [name, setName] = useState('Načítám data...')
  const [lastName, setLastName] = useState('Načítám data...')
  const [email, setEmail] = useState('Načítám data...')
  const [location, setLocation] = useState('Načítám data...')
  const [bio, setBio] = useState('Načítám data...')


  // Class pro inputy podle stavu
  const [nameClass, setNameClass] = useState('informace')
  const [lastNameClass, setLastNameClass] = useState('informace')
  const [locationClass, setLocationClass]= useState('informace')
  const [emailClass, setEmailClass]= useState('informace')
  const [bioClass, setBioClass]= useState('informace')

  // Změna pfp
  const [pfp, setPfp] = useState(defaultPfp)
  const [changingPfp, setChangingPfp] = useState(false)
  const [pfpPublicId, setPfpPublicId] = useState('')

  const handleChangePfp = async (e)=>{
    const file = (e.target.files[0])
    if(!file) return;
    setPfp(file)
    const user = auth.currentUser
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'RePairHub')
    formData.append('folder', `users/${user.uid}/pfp`)
    
    try{
      const resp = await axios.post('https://api.cloudinary.com/v1_1/dmisabll4/image/upload', formData)
      setPfp(resp.data.secure_url)
      setPfpPublicId(resp.data.public_id)
    } catch(err){alert(err.message)}
    setChangingPfp(false)
  }

  const PfpSet = ({onChange}) => {
  return <div className='pfp-set'>
      <p>Zvolte obrázek</p>
      <input 
        type="file"
        onChange={onChange}
      />
      <p style={{color: '#009B73', marginBottom: '40px'}}>Změna se projeví při příštím přihlášení</p>
      <Button onClick={()=>setChangingPfp(false)}>Zrušit</Button>
    </div>
  
}


  // Změny na profilu
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
   const changeBio = (e)=>{
    e.preventDefault()
    setBio(e.target.value)
    setBioClass('changed-info')
  }

 

  // Uložení nových dat
  const saveChanges = async ()=>{
    try {
      const user = auth.currentUser
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, {name, lastName, location, email, bio, pfp, pfpPublicId})  
    } catch(err) {alert(err.message)}
    setNameClass('informace')
    setLastNameClass('informace')
    setLocationClass('informace')
    setEmailClass('informace')
    setBioClass('informace')
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
        const {name, lastName, email, location, bio, pfp, pfpPublicId} = userData
        setName(name)
        setLastName(lastName)
        setEmail(email)
        setLocation(location)
        setBio(bio || '')
        setPfp(pfp || defaultPfp)
        pfpPublicId && setPfpPublicId(pfpPublicId)
      }
    try{
      loadData()
    } catch(err) {alert(err.message)}
  }, [navigate])


  return (<div className='profil-opravar-all'>
    <ProfilHeader nadpisText='Upravit profil' />
      <div className={changingPfp ? 'profil-opravar-smaller profil-opravar' :"profil-opravar"}>


          <img src={pfp} alt={defaultPfp} className='pfp'/>
          <img src={pen} alt='' className='pen' onClick={()=>setChangingPfp(!changingPfp)}/>
          {changingPfp && <PfpSet onChange={(e)=>handleChangePfp(e)}/>}

        { !changingPfp &&
          <form onSubmit={(e)=>e.preventDefault()}>
            <p id='top-profile'>Jméno</p>
            <input 
              type="text"
              value={name}
              onChange={(e)=>changeName(e)}
              className={nameClass}
            /> 
            <p>Příjmení</p>
            <input 
              type="text"
              value={lastName}
              onChange={(e)=>changeLastName(e)}
              className={lastNameClass}
            />
            <p>Lokace</p>
            <input 
              type="text" 
              value={location}
              onChange={(e)=>changeLocation(e)}
              className={locationClass}
            />
            <p>Kontaktní email</p>
            <input 
              type="text"
              value={email}   
              onChange={(e)=>changeEmail(e)}
              className={emailClass}
            />
            <p>Bio</p>
            <input 
              type="text"
              value={bio}
              placeholder='Napište něco o sobě'
              onChange={(e)=>changeBio(e)}
              className={bioClass}
            />
            <ChangeRoleBtn />
            <Button onClick={()=>saveChanges()}>Uložit změny</Button>
          </form>
        }
      </div>
    </div>
  )
}

export default ProfilOpravar