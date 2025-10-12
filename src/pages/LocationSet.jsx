import { useState } from 'react'
import './LocationSet.css'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'


const LocationSet = ()=> {
  const [address, setAddress] = useState("")
  const [src, setSrc] = useState("")
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (!address.trim()) return
    const q = encodeURIComponent(address.trim())
    const iframeSrc = `https://www.google.com/maps?q=${q}&output=embed`
    setSrc(iframeSrc)
  }

  function handleClick(){
    address && navigate('/chose-role')
  }
  return (
    <div className='locationSet'>
      <form onSubmit={handleSubmit} className='location-form'>
          <input
          type="text"
          placeholder="Zadejte adresu"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </form>
        {src ? <iframe src={src} title='map' className='locationIframe'/>:<p className='locationIframe'>Zadejte adresu</p>}
    
        <Button onClick={handleClick}>Pokračovat</Button>
    </div>
  )
}


export default LocationSet