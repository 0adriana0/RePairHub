import styles from '../styles/AllRevievs.module.css'
import BackBtn from '../components/BackBtn'
import logo from '../img/logo-small.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import OneUserReviev from '../components/OneUsersRevievs'
import Button from '../components/Button'
import PublicProfileHeader from '../components/PublicProfileHeader'

const AllRevievs = () => {
  const navigate = useNavigate()
  const pathName = useLocation().pathname

  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [id, setId] = useState('')

  useEffect(()=>{
    const load = async ()=>{
      const uid = pathName.split('/')[pathName.split('/').length-1]
      setId(uid)
      const userRef = doc(db, 'users', uid)
      try{
        const snap = await getDoc(userRef)
        const data = snap.data()
        setUserData(data)
      }catch(err){console.log(err)}
      finally{setLoading(false)}
    }
    load()
  })
  return (
    <div className={styles.container}>
      <PublicProfileHeader text={'Recenze opraváře'} backBtnNavigateTo={`/profile/${id}`}/>
     {!loading&& <OneUserReviev data={userData}/>}
     <div style={{width:'60%'}}>
      <Button>Kontaktovat opraváře</Button></div>
    </div>
  )
}

export default AllRevievs