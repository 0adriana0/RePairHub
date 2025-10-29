import { useState } from 'react'
import '../styles/LocationSet.css'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { updateDoc, doc } from 'firebase/firestore'


const LocationSet = ()=> {
  const [address, setAddress] = useState("")
  const [src, setSrc] = useState("")
  const navigate = useNavigate()

  function hadnleInputChange(e) {
    e.preventDefault()
    const newAdress = e.target.value
    setAddress(newAdress)

    if (!newAdress.trim()) return
      const q = encodeURIComponent(newAdress.trim())
      const iframeSrc = `https://www.google.com/maps?q=${q}&output=embed`
      setSrc(iframeSrc)
  }

  async function handleClick(){
    const user = auth.currentUser
    user || alert.error("Nikdo není přihlášen")
    if (address){
    try{
      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, {location: address})
      navigate('/chose-role')
    } catch (err) {alert(err.message)}
  } else alert('Zadejte adresu')
  }
  return (
    <div className='locationSet'>
          <input
          className='location-form'
          type="text"
          placeholder="Zadejte adresu"
          value={address}
          onChange={(e) => hadnleInputChange(e)}
        />
        {src ? <iframe src={src} title='map' className='locationIframe'/>:<p className='locationIframe'>Zadejte adresu</p>}
    
        <Button onClick={handleClick}>Pokračovat</Button>
        V
    </div>
  )
}


export default LocationSet