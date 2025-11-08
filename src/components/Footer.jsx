import './styles/Footer.css'
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
    const [btnImages, setBtnImages] = useState([])
    const navigate = useNavigate()
    const uid = auth.currentUser.uid
    
    const userRef = doc(db, 'users', uid)
    const [role, setRole] = useState(null)


    

    useEffect(()=>{
      const loadData = async ()=>{
        path === '/profil-opravar' && setBtnImages([greyHouseImg, greyLupaImg, greyZvonekImg, whiteProfilImg])
        path === '/searching' && setBtnImages([greyHouseImg, whiteLupaImg,  greyZvonekImg, greyProfilImg])
        path === '/home' && setBtnImages([whiteHouseImg, greyLupaImg,   greyZvonekImg, greyProfilImg])
        path === '/notifications' && setBtnImages([greyHouseImg, greyLupaImg, whiteZvonekImg, greyProfilImg ])
        try {
          uid || alert("Nikdo není přihlášen")
          uid || navigate('/login')
          const {actualRole} = (await getDoc(userRef)).data()
          setRole(actualRole)
        } catch(err) {alert(err.message)}
      }
      loadData()
        
        
    },[path, uid, navigate, userRef])
    

  return <footer className='footer'>
    <button className='btn-icons first-icon' onClick={()=>navigate('/home')}><img src={btnImages[0]} alt="Home" /></button>
    <button className='btn-icons' onClick={()=>navigate('/searching')}><img src={btnImages[1]} alt="Search" /></button>
    {role==='zákazník'? <button className='add-new-inserate'>+</button>: <img src={celeR} alt='' className='ftr-mid'/>}
    
    <span className='zarovnávání'></span>
    <button className='btn-icons' onClick={()=>navigate('/notifications')}><img src={btnImages[2]} alt="Notification" /></button>
    <button className='btn-icons last-icon' onClick={()=>navigate('/profil-opravar')}><img src={btnImages[3]} alt="Profile" /></button>
  </footer>
}

export default Footer