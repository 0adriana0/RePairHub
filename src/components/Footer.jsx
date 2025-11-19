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

const Footer = () => {
    const location = useLocation()
    const path = location.pathname
    const [btnImages, setBtnImages] = useState([])
    const navigate = useNavigate()
    

    useEffect(()=>{
        path === '/profil-opravar' && setBtnImages([greyHouseImg, greyLupaImg, greyZvonekImg, whiteProfilImg])
        path === '/searching' && setBtnImages([greyHouseImg, whiteLupaImg,  greyZvonekImg, greyProfilImg])
        path === '/home' && setBtnImages([whiteHouseImg, greyLupaImg,   greyZvonekImg, greyProfilImg])
        path === '/notifications' && setBtnImages([greyHouseImg, greyLupaImg, whiteZvonekImg, greyProfilImg ])
    },[path])
    

  return <footer className='footer'>
    <button className='btn-icons first-icon' onClick={()=>navigate('/home')}><img src={btnImages[0]} alt="Home" /></button>
    <button className='btn-icons' onClick={()=>navigate('/searching')}><img src={btnImages[1]} alt="Search" /></button>
    <button className='add-new-inserate' onClick={()=>navigate('/profil-zakaznik/add/step1')}>+</button>
    <span className='zarovnávání'></span>
    <button className='btn-icons' onClick={()=>navigate('/notifications')}><img src={btnImages[2]} alt="Notification" /></button>
    <button className='btn-icons last-icon' onClick={()=>navigate('/profil-opravar')}><img src={btnImages[3]} alt="Profile" /></button>
  </footer>
}

export default Footer