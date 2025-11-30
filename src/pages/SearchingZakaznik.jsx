import styles from '../styles/SearchingZakaznik.module.css'
import greyLupa from '../img/Footer/grey/lupa.png'
import { useEffect, useState } from 'react'
import defaultPfp from '../img/pfp-default.png'
import Stars from '../components/Stars'
import {db} from '../firebase'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

const SearchingZakaznik = () => {
    const [searchingBar, setSearchingBar] = useState('')
    const [resultsText, setResultsText] = useState('Návrhy pro vás:')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const load = async ()=>{
            try {
                const snap = await getDocs(collection(db, 'users'))
                const allUsers = snap.docs.map((one)=> one.data())
                const fillteredUsers = allUsers.filter((one)=>one.educations!==undefined)
                setUsers(fillteredUsers)
            } catch (err) {alert(err.message); console.log(err)}
            finally {setLoading(false)}
        }
        load()
    },[])

  return (
    <div className={styles.container}>
        <div className={styles.search}>
            <img className={styles.searchBarImg} src={greyLupa} alt="" />
                <input 
                    type="text" 
                    placeholder='Co hledáte? Př. Truhlář, Novotný'
                    className={styles.searchBarInput}
                    value={searchingBar}
                    onChange={(e)=>setSearchingBar(e.target.value)}
                    />
        </div>
        <p className={styles.results}>{resultsText}</p>
        <div className={styles.wrapp}>
        {loading? <p className={styles.loading}>Načítám data...</p>:users.map((one)=>{
            const {pfp, name, lastName, bio, rating, recenze} = one
            return <div className={styles.oneUser}>
                <img src={pfp||defaultPfp} alt="" className={styles.pfp}/>
                <p className={styles.name}>{name} {lastName}</p>
                <p className={styles.bio}>{bio||' '}</p>
                <div className={styles.bottom}>
                    <div className={styles.starWrapp}>
                        <Stars rating={rating} className={styles.star} />
                    </div>
                    <p className={styles.rating}>{recenze?recenze.length:'0'} {recenze&&recenze.length<5?'recenze':'recenzí'}</p>
                    <button className={styles.btn}>Přejít na profil</button>
                </div>
                
            </div>
        })}
        </div>

    </div>
  )
}

export default SearchingZakaznik