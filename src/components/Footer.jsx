import styles from '../styles/Footer.module.css'
import whiteHouseImg from '../img/Footer/white/house.png'
import whiteLupaImg from '../img/Footer/white/lupa.png'
import whiteProfilImg from '../img/Footer/white/profil.png'
import whiteZvonekImg from '../img/Footer/white/zvonek.png'
import greyHouseImg from '../img/Footer/grey/house.png'
import greyLupaImg from '../img/Footer/grey/lupa.png'
import greyZvonekImg from '../img/Footer/grey/zvonek.png'
import greyProfilImg from '../img/Footer/grey/profil.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { db, auth } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import celeR from '../img/celeR.png'

const Footer = () => {
    const location = useLocation()
    const path = location.pathname
    const [btnImages, setBtnImages] = useState(['','','',''])
    const navigate = useNavigate()
    const [role, setRole] = useState(null)



    useEffect(()=>{
      const loadData = async ()=>{
        if(path === '/profil-opravar'||path==='/profil-zakaznik'||path==='/profil-zakaznik/prispevky'||path ==='/profil-zakaznik/add/step1'){ setBtnImages([greyHouseImg, greyLupaImg, greyZvonekImg, whiteProfilImg])}
        if(path === '/searching-opravar'||path==='/searching-zakaznik'||path==='/profile/:userId'){setBtnImages([greyHouseImg, whiteLupaImg,  greyZvonekImg, greyProfilImg])}
        if(path === '/home-opravar'||path === '/home-zakaznik'){setBtnImages([whiteHouseImg, greyLupaImg,   greyZvonekImg, greyProfilImg])}
        if(path === '/notifications-opravar'||path === '/notifications-zakaznik'){setBtnImages([greyHouseImg, greyLupaImg, whiteZvonekImg, greyProfilImg ])}
        try {
          const uid = auth.currentUser.uid
          uid || navigate('/login')
          const userRef = doc(db, 'users', uid)
          const {actualRole} = (await getDoc(userRef)).data()
          setRole(actualRole)
        } catch(err) {alert(err.message)}
      }
      loadData()
        
        
    },[path, navigate])
    

  return <footer className={styles.footer}>
    <button className={styles.buttons} onClick={()=>navigate('/home-opravar')}><img src={btnImages[0]} alt="Home" /></button>
    <button className={styles.buttons} onClick={()=>role==='opravář'?navigate('/searching-opravar'):navigate('/searching-zakaznik')}><img src={btnImages[1]} alt="Search" /></button>

    {role==='zákazník'
    ? <button className={styles.add}>+</button>
    : <img src={celeR} alt='' className={styles.middle}/>}
    
    <span></span>
    <button className={styles.buttons} onClick={()=>navigate('/notifications-opravar')}><img src={btnImages[2]} alt="Notification" /></button>
    <button className={styles.buttons} onClick={()=>navigate('/profil-opravar')}><img src={btnImages[3]} alt="Profile" /></button>
  </footer>
}

export default Footer