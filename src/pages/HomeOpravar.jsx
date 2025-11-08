import '../styles/HomeOpravar.css'
import logo from '../img/logo.png'
import { useEffect, useState } from 'react'
import { db, auth} from '../firebase'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'

const HomeOpravar = () => {
    const [name, setName] = useState('')
    const navigate = useNavigate()


    useEffect(()=>{
        const loadData = async () =>{
            const uid = auth.currentUser.uid
            !uid && (alert('Nikdo není přihláčen', navigate('/login')))
            const userRef = doc(db, 'users', uid)
            const data = (await getDoc(userRef, uid)).data()
            setName(data.name)
        }

        loadData()
    })

  return (
    <div className='home-opravar-all'>
        <header>
            <img src={logo} alt="" />
            <p className='text-top welcoming'>Výtejte v aplikaci RePairHub</p>
            <p className='name text-top'>{name||'jmeno'}!</p>
            <hr/>
            <p>Aktuální nabídky</p>
        </header>
        <div className="home-opravar">
        
        </div>
    </div>
  )
}

export default HomeOpravar