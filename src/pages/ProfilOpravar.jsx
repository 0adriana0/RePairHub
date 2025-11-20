import styles from '../styles/ProfilOpravar.module.css'
import ProfilHeader from '../components/ProfilHeader'
import defaultPfp from '../img/pfp-default.png'
import { auth,db } from '../firebase'
import {  useEffect, useState } from 'react'
import { arrayRemove, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import ChangeRoleBtn from '../components/ChangeRoleBtn'
import pen from '../img/pen.png'
import axios from 'axios'
// import { cat } from '@cloudinary/url-gen/qualifiers/focusOn'
const ProfilOpravar = () => {
  

  
  const navigate = useNavigate()

  const [allowDataSave, setAllowDataSave] = useState(false) 

  // Informace z databáze
  const [pfp, setPfp] = useState(defaultPfp)
  const [name, setName] = useState('Načítám data...')
  const [lastName, setLastName] = useState('Načítám data...')
  const [email, setEmail] = useState('Načítám data...')
  const [location, setLocation] = useState('Načítám data...')
  const [bio, setBio] = useState('Načítám data...')
  const [educations, setEducations] = useState(null)
  const [certificates, setCertificates] = useState(null)


  // Class pro inputy podle stavu
  const [nameClass, setNameClass] = useState('informace')
  const [lastNameClass, setLastNameClass] = useState('informace')
  const [locationClass, setLocationClass]= useState('informace')
  const [emailClass, setEmailClass]= useState('informace')
  const [bioClass, setBioClass]= useState('informace')

  // Back Button
  const [showBackBtn, setShowBackBtn] = useState(false)
  const [backBtnOnclick, setBackBtnOnClick] = useState(()=>{})
  const handleBackClick = ()=>{
    setVerifyingEducations(false)
    setShowBackBtn(false)
  }
  const handle2ndBackClick = ()=>{
    setVerifyingOneEducation(false)
    setBackBtnOnClick(()=>()=>handleBackClick())
  }
  const handleDisableAddingBackClick = ()=>{
    setAddingEducations(false)
    setShowBackBtn(false)
  }

  // Přidávání vzdělání
  const handleAddEducationsBtn = async ()=>{
    setShowBackBtn(true)
    setBackBtnOnClick(()=>()=>handleDisableAddingBackClick())
    setAddingEducations(true)
    
  }

  const [addingEducations, setAddingEducations] = useState(false)
  const AddEducations = () =>{
    const [addingCertificate, setAddingCertificate] = useState(true)
    const [newAddedEducation, setNewAddedEducation] = useState('')
    const [savingNewEducations, setSavingNewEducations] = useState(false)

    const confirmNewEducation = async () =>{
      setSavingNewEducations(true)
      const uid = auth.currentUser.uid
      const userRef = doc(db, 'users', uid)
      const updatedDocument = addingCertificate ? certificates : educations
      updatedDocument.push(newAddedEducation)
      
      if(newAddedEducation) try{
        addingCertificate ? await updateDoc(userRef, {certificates:updatedDocument}) : await updateDoc(userRef, {educations:updatedDocument})
        setAddingEducations(false)
        setSavingNewEducations(false)
      }catch(err){alert(err.message)}
      else alert('Vyplňte prosím pole')
    }
    
    
    return <>
      <p className={styles.educationsAddingHeading}>Přidáváte: <span onClick={()=>setAddingCertificate(!addingCertificate)} className={ addingCertificate?styles.activeAddingSpan:styles.inactiveAddingSpan}>Certifikát</span>/<span onClick={()=>setAddingCertificate(!addingCertificate)} className={ !addingCertificate?styles.activeAddingSpan:styles.inactiveAddingSpan}>Vzdělání</span></p>
      <p className={styles.vasCertificatOrVzdelani}>{addingCertificate?'Váš certifikát':'Vaše vzdělání'}</p>
      <input 
        style={{marginBottom: '130%'}}
        type="text" 
        placeholder={addingCertificate?'Cisco - IT Essentials':'Střední odborné učiliště...'}
        value={newAddedEducation}
        onChange={(e)=>setNewAddedEducation(e.target.value)}
        />
      <Button onClick={()=>confirmNewEducation()}>{savingNewEducations?'Ukládám...':'Potvrdit a přidat'}</Button>
    </>
  }

  // Ověření vzdělání
  const [verifyingEducations, setVerifyingEducations] = useState(false)
  const [savingData, setSavingData] = useState(false)
  const [verifyingOneEducation, setVerifyingOneEducation] = useState(false)
  const [oneEducation, setOneEducation] = useState('')

  const startVerifying = async (e) => {
    setVerifyingEducations(true)
    setShowBackBtn(true)
    setBackBtnOnClick(() => ()=> {
    handleBackClick()
    })
  }


  const UnveryfiedEducations = () => {
    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)
     const OneUnveryfiedEducation = ({educationName}) => {
      return (
        <div className={styles.oneUnveryfiedEducation}>
          <p className={styles.oneEducationName}>{educationName}</p>
          <button onClick={()=>{
            setOneEducation(educationName)
            setBackBtnOnClick(()=>()=>handle2ndBackClick())
            setVerifyingOneEducation(true)
          }}
          className={styles.startVerifyingOneEducationBtn}
          >Přidat ověření</button>
        </div>
      )
    }
    
    const VerifyingOneEducation = ()=>{
      return <form className={styles.verifyingOneEducation}>
        <h3 style={{margin: '20px 0 40px 0', textAlign:'left'}}>Ověření vzdělání {oneEducation}</h3>
        <h4 style={{textAlign:'left'}}>První strana</h4>
        <input className={styles.verifyingOneEducationInput} type="file" onChange={(e)=>setFile1(e.target.files[0])}/>
        <h4 style={{textAlign:'left'}}>Druhá strana</h4>
        <input className={styles.verifyingOneEducationInput} type="file" onChange={(e)=>setFile2(e.target.files[0])}/>
      </form>
    }

    const handleVerifycationsSave = ()=>{
      const save = async ()=>{
        setSavingData(true)
        const uid = auth.currentUser.uid
        const formData1 = new FormData()
        formData1.append('file', file1)
        formData1.append('upload_preset', 'RePairHub')
        formData1.append('folder', `users/${uid}/verifycation/${oneEducation}/firstSide`)
        const formData2 = new FormData()
        formData2.append('file', file2)
        formData2.append('upload_preset', 'RePairHub')
        formData2.append('folder', `users/${uid}/verifycation/${oneEducation}/secondSide`)
        
        try {
          const resp1 = await axios.post('https://api.cloudinary.com/v1_1/dmisabll4/image/upload', formData1)
          const resp2 = await axios.post('https://api.cloudinary.com/v1_1/dmisabll4/image/upload', formData2)

          console.log(oneEducation);
          
          const userRef = doc(db, 'users', uid, 'verifyed', oneEducation)
          await setDoc(userRef, {firstSideUrl: resp1.data.secure_url, secondSideUrl: resp2.data.secure_url})

          educations.includes(oneEducation) && await updateDoc(doc(db,  'users', uid), {educations: arrayRemove(oneEducation)})
          certificates.includes(oneEducation) && await updateDoc(doc(db,  'users', uid), {certificates: arrayRemove(oneEducation)})
          setSavingData(false)
          setVerifyingOneEducation(false)
          setBackBtnOnClick(()=>()=>handleBackClick())
        }catch(err){console.log(err)}
        }
      file1&&file2 ? save() : alert('Nahrajte prosím OBĚ strany')
    }
    const handleBackToProfileInfo = ()=>{
      setVerifyingEducations(false)
      setShowBackBtn(false)
    }
    
    return (
      <>
      {!verifyingOneEducation && educations&& certificates && <div className={styles.unveryfiedEducations}>
        <p className={styles.pocetNeoverenychVzdelani}>
          Máte neověřeno: <br />
          {educations.length} vzdělání <br />
          {certificates.length} certifikátů
        </p>
        {educations.map((one)=>{
          return <OneUnveryfiedEducation educationName={one} />
        })}
        {certificates.map((one)=>{
          return <OneUnveryfiedEducation educationName={one} />
        })}
        <p style={{marginTop: '50px', fontSize:'13px'}}>Změny se projeví do pár minut</p>
      </div>}
      {verifyingOneEducation && <VerifyingOneEducation/>}
      
  
      <Button onClick={()=>verifyingOneEducation ? handleVerifycationsSave(): handleBackToProfileInfo()}>{savingData?'Ukládám...':'Uložit'}</Button>
      </>
    )
  }


  // Změna pfp
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
  return <div className={styles.pfpSet}>
      <p className={styles.zvolteObrazek}>Zvolte obrázek</p>
      <input 
        className={styles.pfpFileInput}
        type="file"
        onChange={onChange}
      />
      <p style={{color: '#009B73', marginBottom: '40px', fontSize:'13px'}}>Změna se projeví při příštím přihlášení</p>
      <Button onClick={()=>setChangingPfp(false)}>Zrušit</Button>
    </div>
  
}


  // Změny na profilu
  const changeName = (e)=>{
    e.preventDefault()
    setName(e.target.value)
    setNameClass('changedInfo')
  }
  const changeLastName = (e)=>{
    e.preventDefault()
    setLastName(e.target.value)
    setLastNameClass('changedInfo')
  }
  const changeLocation = (e)=>{
    e.preventDefault()
    setLocation(e.target.value)
    setLocationClass('changedInfo')
  }
  const changeEmail = (e)=>{
    e.preventDefault()
    setEmail(e.target.value)
    setEmailClass('changedInfo')
  }
   const changeBio = (e)=>{
    e.preventDefault()
    setBio(e.target.value)
    setBioClass('changedInfo')
  }


  // Uložení nových dat
  const saveChanges = ()=>{
    const doSaveChanges = async ()=>{
      try {
        const user = auth.currentUser
        const userRef = doc(db, 'users', user.uid)
        await updateDoc(userRef, {name, lastName,   location, email, bio, pfp, pfpPublicId})  
      } catch(err) {alert(err.message)}
      setNameClass('informace')
      setLastNameClass('informace')
      setLocationClass('informace')
      setEmailClass('informace')
      setBioClass('informace')
    }
    allowDataSave && doSaveChanges()
  }

  // Vynucená změna role na opravář
  useEffect(()=>{
    const forceChangeRole = async()=>{
      try{
        await updateDoc(doc(db,'users',auth.currentUser.uid),{actualRole: 'opravář'})
      }catch(err){console.log(err)}  
    }
    forceChangeRole()
  },[])

  // Načítání dat
  useEffect(()=>{
    const user = auth.currentUser
      user || alert("Nikdo není přihlášen")
      user || navigate('/login')
      async function loadData(){
        const user = auth.currentUser
        const userRef = doc(db, 'users', user.uid)
        const userData = (await getDoc(userRef)).data()
        const {name, lastName, email, location, bio, pfp, pfpPublicId, educations, certificates} = userData
        setName(name)
        setLastName(lastName)
        setEmail(email)
        setLocation(location)
        setBio(bio || '')
        setPfp(pfp || defaultPfp)
        pfpPublicId && setPfpPublicId(pfpPublicId)
        setEducations(educations)
        setCertificates(certificates)
        setAllowDataSave(true)
      }
    try{
      loadData()
    } catch(err) {alert(err.message)}
  }, [navigate])

  // Zákaz tlačítka Zpět
  useEffect(() => {
  const blockBackButton = () => {
    window.history.pushState(null, '', window.location.href)
  }
  const handlePopState = (event) => {
    event.preventDefault()
    blockBackButton()
  }
  blockBackButton()
  window.addEventListener('popstate', handlePopState)
  return () => {
    window.removeEventListener('popstate', handlePopState)
  }
}, [])




  const showMain = !verifyingEducations && !changingPfp && !addingEducations

  return (<div className={styles.profilOpravarAll}>
    <ProfilHeader 
      nadpisText='Upravit profil' 
      showBackBtn={showBackBtn}
      backBtnOnClick={backBtnOnclick}
    />
      <div className={changingPfp ? `${styles.profilOpravarSmaller} ${styles.profilOpravar}` :styles.profilOpravar}>

          {(!verifyingEducations && !addingEducations )&&<>
            <img src={pfp} alt='' className={styles.pfp}/>
            <img src={pen} alt='' className={styles.pen} onClick={()=>setChangingPfp(!changingPfp)}/>
          </>}
          
          {changingPfp && <PfpSet onChange={(e)=>handleChangePfp(e)}/>}
          {verifyingEducations && <UnveryfiedEducations/>}
          {addingEducations && <AddEducations/>}

        { showMain && <>
        {((educations||certificates)&&educations.length+certificates.length>0) &&<>
          <p className={styles.overteSvaVzdelani} onClick={(e)=>startVerifying(e)}>OVĚŘTE SVÁ VZDĚLÁNÍ: {certificates.length+educations.length}</p>
          <button className={styles.verifyHereBtn} onClick={(e)=>startVerifying(e)}>Ověřit zde</button>
        </>}
        
          <form onSubmit={(e)=>e.preventDefault()}>
            <p id={styles.topProfile} className={styles.infoHeadings}>Jméno</p>
            <input 
              type="text"
              value={name}
              onChange={(e)=>changeName(e)}
              className={styles[nameClass]}
            /> 
            <p className={styles.infoHeadings}>Příjmení</p>
            <input 
              type="text"
              value={lastName}
              onChange={(e)=>changeLastName(e)}
              className={styles[lastNameClass]}
            />
            <p className={styles.infoHeadings}>Lokace</p>
            <input 
              type="text" 
              value={location}
              onChange={(e)=>changeLocation(e)}
              className={styles[locationClass]}
            />
            <p className={styles.infoHeadings}>Kontaktní email</p>
            <input 
              type="text"
              value={email}   
              onChange={(e)=>changeEmail(e)}
              className={styles[emailClass]}
            />
            <p className={styles.infoHeadings}>Bio</p>
            <input 
              type="text"
              value={bio}
              placeholder='Napište něco o sobě'
              onChange={(e)=>changeBio(e)}
              className={styles[bioClass]}
            />
            <div className={styles.bottomBtns}>
              <ChangeRoleBtn />
              <button className={styles.addEducationsBtn} onClick={()=>handleAddEducationsBtn()}>Přidat vzdělání</button>
            </div>
            <Button onClick={()=>saveChanges()}>Uložit změny</Button>
          </form>
          </>
        }
      </div>
    </div>
  )
}

export default ProfilOpravar