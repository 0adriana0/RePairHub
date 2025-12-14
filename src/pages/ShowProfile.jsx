import styles from '../styles/ShowProfile.module.css'
import smallLogo from '../img/logo-small.png'
import BackBtn from '../components/BackBtn'
import Button from '../components/Button'
import OneProfile from '../components/OneProfile'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import {db} from '../firebase'

const ShowProfile = () => {
    const navigate = useNavigate()
    const pathName = useLocation().pathname

    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState('')

    useEffect(()=>{
        const load =async ()=>{
            const uid = pathName.split('/')[pathName.split('/').length-1]
            setId(uid)
            const userRef = doc(db, 'users', uid)
            try {
                const user = await getDoc(userRef)
                setUserData(user.data())
            }catch (err){alert(err.message);console.log(err)}
            finally{setLoading(false)}
        }
        load()
    },[])
  return (
    <>
    {!loading?<div className={styles.container}> 
            <header className={styles.header}>
                <BackBtn show={true} onClick={()=>{navigate('/searching-zakaznik')}}/>
                <img className={styles.logo} src={smallLogo} alt="" />
                <h2 className={styles.heading}>Profil opraváře</h2>
            </header>
            <OneProfile user={userData} id={id}/>
            <div style={{width:'60%'}}>
                <Button>Kontaktovat opraváře</Button>
            </div>
        </div>: <p className='loading'>načítám</p>
        }
     
    </>
  )
}

export default ShowProfile