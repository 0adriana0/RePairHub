import styles from '../styles/FullReviev.module.css'
import PublicProfileHeader from '../components/PublicProfileHeader'
import defaultPfp from '../img/pfp-default.png'
import Stars from '../components/Stars'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const FullReviev = () => {
  const pathName = useLocation().pathname
  const uid = pathName.split('/')[pathName.split('/').length-2]

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const {name, lastName, pfp, content, stars} = !loading&&data[0]
  
  useEffect(()=>{
    const load = async ()=>{
      const userRef = doc(db,'users',uid)
      try{
        const snap = await getDoc(userRef)
        const recenze = snap.data().recenze
        const filltered = recenze.filter(one=>one.id==pathName.split('/')[pathName.split('/').length-1])
        setData(filltered)
      } catch (err){console.log(err)}
      finally {setLoading(false)}
    }
    load()
  },[])
  return (
    <div className={styles.container}>
        <PublicProfileHeader text={'Recenze opraváře'} backBtnNavigateTo={`/revievs/${uid}`}/>
        <main className={styles.main}>
          <div className={styles.wrapp}>
            <img src={pfp||defaultPfp} alt="" className={styles.pfp}/>
            <h3 className={styles.heading}>{name} {lastName}</h3>
            <div className={styles.starWrapp}>
              <Stars rating={stars} className={styles.star}/>
            </div>
          </div>
          <p className={styles.subHeading}>Komentář</p>
          <p className={styles.text}>{content}</p>
        </main>
    </div>
  )
}

export default FullReviev