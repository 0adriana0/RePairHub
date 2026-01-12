import { useEffect, useState } from 'react'
import logo from '../img/logo.png'
import defaultPfp from '../img/pfp-default.png'
import { auth, db } from '../firebase'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import styles from '../styles/HomeZakaznik.module.css'


const Card = (user) =>{
    const {pfp, name, lastName, bio} = user.user
    console.log(name);
    
    return <div className={styles.card}>
        <img src={pfp||defaultPfp} alt="" />
        <p>{name} {lastName}</p>
        <p className={styles.bio}>{bio}</p>
    </div>
}

const HomeZakaznik = () => {
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState(null)

    const [usersToMap, setUsersToMap] = useState(null)

    // Opraváři
    useEffect(()=>{
        const load = async ()=>{
            const colRef = collection(db, 'users')

            try{
                const snap = await getDocs(colRef)
                const all = snap.docs
                const filltered = all.filter(one=>one.data().allSkills&&one)
                setUsersToMap(filltered);
                
                
            }catch(err){alert('Chyba při načítání: '+err.message); console.log(err)}
            finally{setLoading(false)}
            }

        load()
    },[])


    // User data
    useEffect(()=>{
        const load = async ()=>{
            const uid = auth.currentUser.uid
            const userRef = doc(db, 'users', uid)

            try{
                const snap = await getDoc(userRef)
                const x = snap.data().name
                setName(x)

            }catch(err){console.log(err)}
            
        }
        load()
    },[])


  return (<>
    {!loading&&
        <div className={styles.container}>    
            <header className={styles.header}>
                <img src={logo} alt="" />
                <h2 className={styles.welcome}>Vítejte v aplikaci RePairHub</h2>
                {name&&<h2 className={styles.name}>{name}!</h2>}
                <hr />
                <h2 className={styles.topText}>Naši opraváři</h2>
            </header>
            <div className={styles.wrapp}>
                {usersToMap.map(one=><Card user={one.data()}/>)}
            </div>
        </div>}
    </>
  )
}

export default HomeZakaznik