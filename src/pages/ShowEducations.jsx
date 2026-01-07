import styles from '../styles/ShowEducations.module.css'
import defaultPfp from '../img/pfp-default.png'
import { useEffect, useState } from 'react'
import { db} from '../firebase'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import BackBtn from '../components/BackBtn'
import cam from '../img/camera.png'



const ShowEducations = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showed, setShowed] = useState(0)

    const {pfp, name, lastName} = !loading && userData.data
    const {verifyed} = !loading && userData
    const eduNames = !loading && verifyed.map(x=> x.educationName)
    const images = !loading && verifyed.map(x=> x.data)
    
    const showedName = !loading && eduNames[showed]
    const showedImgs = !loading && [images[showed].firstSideUrl, images[showed].secondSideUrl]
    
    // Back click
    const handleBack = ()=>{
        const pathId = location.pathname.split('/')[location.pathname.split('/').length-1]
        navigate(`/profile/${pathId}`)
    }

    useEffect(()=>{
        const load = async()=>{
            const uid = location.pathname.split('/')[location.pathname.split('/').length-1]
            const verifyedRef = collection(db, 'users', uid,'verifyed')
            const userRef = doc(db, 'users', uid)

            try{
                const snap = await getDocs(verifyedRef)
                const verifyed = snap.docs.map(x => ({educationName: x.id,data: x.data()}))
                
                const snap2 = await getDoc(userRef)
                const data = snap2.data()

                setUserData({data, verifyed})
                

            }catch(err) {console.log(err); alert('Chyba: '+ err.message)}
            finally{setLoading(false)}

        }


        load()
    },[])

  return (<>
    <BackBtn onClick={()=>handleBack()}/>
    {!loading?<div className={styles.all}>
        <h2 className={styles.h2}>Profil opraváře</h2>
        <div className={styles.main}>
            <div className={styles.top}>
                <img className={styles.pfp} src={pfp||defaultPfp} alt="" />
                <div className={styles.texts}>
                    <h3>{name} {lastName}</h3>
                    <p>{showedName||'Načítám...'}</p>
                    <button onClick={()=>setShowed(showed<eduNames.length-1 ? showed+1:0)}>Další</button>
                </div>
            </div>
            <div className={styles.wrapp}>
                <img src={showedImgs[0]||cam} alt="" />
                <img src={showedImgs[1]||cam} alt="" />
            </div>
        </div>
        <div style={{width: '60%'}}><Button>Kontaktovat opraváře</Button></div>
    </div>:<p>loading</p>}
  </>)
}

export default ShowEducations