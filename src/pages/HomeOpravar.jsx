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
            !uid && navigate('/login')
            !uid && alert('Nikdo není přihláčen')
            const userRef = doc(db, 'users', uid)
            try {
                const data = (await getDoc(userRef, uid)).data()
                setName(data.name)
            }catch(err){console.log(err)}
        }
        loadData()
    },[navigate])

  return (
    <div className='home-opravar-all'>
        <header>
            <img src={logo} alt="" />
            <p className='text-top welcoming'>Výtejte v aplikaci RePairHub</p>
            <p className='name text-top'>{name||'Jméno'}!</p>
            <hr/>
            <p>Aktuální nabídky</p>
        </header>
        <div className="home-opravar">
        
        </div>
    </div>
  )
}

export default HomeOpravar