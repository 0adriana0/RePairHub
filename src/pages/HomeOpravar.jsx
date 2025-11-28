import styles from '../styles/HomeOpravar.module.css'
import inserateStyles from '../styles/OneInseratePrewiew.module.css'
import logo from '../img/logo.png'
import { useEffect, useState } from 'react'
import { db, auth} from '../firebase'
import { useNavigate } from 'react-router-dom'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import defaultPfp from '../img/pfp-default.png'
import chatBtn from '../img/Chat btn.png'
const HomeOpravar = () => {
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const [inserates, setInserates] = useState([])
    
    // Načítání dat
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
        const loadInserateData = async ()=>{
            try{
                const snapshot = await getDocs(collection(db, "posts"))
                setInserates(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
                
            } catch(err) {alert(err.message); console.log(err);}
        }
        loadData()
        loadInserateData()
    },[navigate])

  return (
    <div className={styles.bigContainer}>
        <header className={styles.header}>
            <img className={styles.hImage} src={logo} alt="" />
            <p className={styles.welcoming}>Výtejte v aplikaci RePairHub</p>
            <p className={styles.name}>{name||'Jméno'}!</p>
            <hr className={styles.hr}/>
            <p style={{fontWeight:'bold', fontSize:'15px'}}>Naši zákazníci</p>
        </header>
        <div className={styles.container}>
            {inserates.map((one, index)=>{
                const {id, userPfp, userName, userLastName, description, imageOneURL, imageTwoURL} = one
                return <div key={index} className={inserateStyles.oneInserate}>
                    <img className={inserateStyles.userPfp} src={userPfp||defaultPfp} alt="" />
                    <p className={inserateStyles.userNameLastName}>{userName} {userLastName}</p>
                    <p className={inserateStyles.inserateDescription}>{description}</p>
                    <div className={inserateStyles.inserateBottom}>
                        <div className={inserateStyles.wrapper}>
                            <img className={inserateStyles.inserateImages} src={imageOneURL} alt="" />
                        </div>
                        <div className={inserateStyles.wrapper}>
                            <img className={inserateStyles.inserateImages} src={imageTwoURL} alt="" />
                        </div>
                        <button className={inserateStyles.showMoreBtn} onClick={()=>navigate(`/one-inserate/${id}`)}>Zobrazit více</button>
                    </div>
                </div>
            })}
            <img className={styles.btn} src={chatBtn} alt="" onClick={()=>navigate('/chat')}/>
        </div>
    </div>
  )
}

export default HomeOpravar