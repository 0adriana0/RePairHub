import styles from '../styles/OneInserate.module.css'
import BackBtn from '../components/BackBtn'
import smmallLogo from '../img/logo-small.png'
import defaultPfp from '../img/pfp-default.png'
import { useEffect, useState } from 'react'
import camera from '../img/camera.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

const OneInserate = () => {
    const navigate = useNavigate()
    const pathName = useLocation().pathname
    const [inserate, setInserate] = useState({userName: 'Načítám data'})
    const {userPfp, userName, userLastName,location, description, hashtags, imageOneURL, imageTwoURL} = inserate

    useEffect(()=>{
      const loadData = async ()=>{
        const id = pathName.split('/one-inserate/')[1]
        try {
          const docRef = doc(db, 'posts', id)
          const inserateData = (await getDoc(docRef)).data()
          setInserate(inserateData)
        } catch (err) {alert(err.message); console.log(err);
        }
      }

      loadData()
    },[pathName])

  return (<div className={styles.container}>
    <header className={styles.header}>
        <BackBtn show={true} onClick={()=>navigate('/home-opravar')}/>
        <img className={styles.topImage} src={smmallLogo} alt="" />
        <h2 className={styles.heading}>Příspěvek od {userName}</h2>
    </header>
    <div className={styles.main}>
        <img className={styles.pfp} src={defaultPfp} alt="" />
        <p className={styles.name}>{userName} {userLastName}</p>
        <a href={`https://www.google.com/maps?q=${location}`} className={styles.location}>{location}</a>
        <p className={styles.hashtags}>{hashtags && hashtags.map((one)=>{return one+' '})}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.image_container}>
            <div className={styles.wrapper}><img className={styles.images} src={imageOneURL} alt="" /></div>
            <div className={styles.wrapper}><img className={styles.images} src={imageTwoURL||camera} alt="" /></div>
        </div>
    </div>
    <button
     className={styles.button}
    //  onClick={navigate('CHAT S OPRAVAREM')}
    >Kontaktovat</button>
  </div>)
}

export default OneInserate