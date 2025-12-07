import styles from '../styles/SearchingZakaznik.module.css'
import greyLupa from '../img/Footer/grey/lupa.png'
import { useEffect, useState } from 'react'
import defaultPfp from '../img/pfp-default.png'
import Stars from '../components/Stars'
import {auth, db} from '../firebase'
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const SearchingZakaznik = () => {
    const [searchingBar, setSearchingBar] = useState('')
    const [resultsText, setResultsText] = useState('Návrhy pro vás:')
    const [users, setUsers] = useState([])
    const [lastSearchedUsers, setLastSearchedUsers] = useState([])
    const [mapedUsers, setMapedUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const handleEmptySearchingBar = ()=>{
                setResultsText(lastSearchedUsers.length?'Minule jste hledali: ':'Návrhy pro vás:')
                setMapedUsers(lastSearchedUsers.length?lastSearchedUsers:users)
            }

    // Uložení do last searched
    const handleShowProfile = async (userId)=>{
        const uid = auth.currentUser.uid
        const userRef = doc(db, 'users', uid)
        try {
            const current = lastSearchedUsers.map((one)=>{return one.id})
            !current.includes(userId)&& await updateDoc(userRef, {lastSearchedUsers: [...current, userId]})
        } catch(err){console.log(err.message)}
        finally {navigate(`/profile/${userId}`)}
    }

    // Načítání opravářů a historie
    useEffect(()=>{
        const load = async ()=>{
            try {
                const snap = await getDocs(collection(db, 'users'))
                const allUsers = snap.docs.map((one)=> one.data())
                const fillteredUsers = allUsers.filter((one)=>one.educations!==undefined)
                const uid = auth.currentUser.uid
                const snap2 = await getDoc(doc(db, 'users', uid))
                const lastSearched = snap2.data().lastSearchedUsers
                if(lastSearched){
                lastSearched.length && setLastSearchedUsers(allUsers.filter(one=> lastSearched.includes(one.id)))
                lastSearched.length && setMapedUsers(fillteredUsers.filter(one=> lastSearched.includes(one.id)))
                lastSearched.length&&setResultsText('Minule jste hledali:')
                } else {setMapedUsers(fillteredUsers); setResultsText('Návrhy pro vás: ')}
                setUsers(fillteredUsers)
                
            } catch (err) {alert(err.message); console.log(err)}
            finally {setLoading(false)}
        }
        load()
    },[])

    // Změna textu pod vyhledáváním
    useEffect(()=>{
        if(searchingBar){
            const results = []
            users.map((one)=>{
                const {lastName, location, bio, allSkills} = one
                if (searchingBar.toLowerCase().includes(lastName.toLowerCase())||searchingBar.toLowerCase().includes(location.toLowerCase())||bio.toLowerCase().includes(searchingBar.toLowerCase())||allSkills.includes(searchingBar)||lastName.toLowerCase().includes(searchingBar.toLowerCase())||location.toLowerCase().includes(searchingBar.toLowerCase())) {results.push(one)} else return;
            })
            setMapedUsers(results)
            searchingBar ? setResultsText(`Výsledky pro ${searchingBar}:`)
            : handleEmptySearchingBar()

            
        }
    },[searchingBar])

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
                    onKeyDown={(e)=>{
                        e.key==='Backspace'&&(!searchingBar&&setResultsText(lastSearchedUsers.length?'Minule jste hledali:':'Návrhy pro vás:'));
                        !e.target.value&& handleEmptySearchingBar()
                    }}
                    onKeyUp={(e)=>{
                        e.key==='Backspace'&&(!searchingBar&&setResultsText(lastSearchedUsers.length?'Minule jste hledali:':'Návrhy pro vás:'));
                        !e.target.value&& handleEmptySearchingBar()    
                    }}
                    />
    
        </div>
        <p className={styles.results}>{resultsText}</p>
        <div className={styles.wrapp}>
        {loading? <p className={styles.loading}>Načítám data...</p>:mapedUsers.map((one)=>{
            const {id, pfp, name, lastName, bio, rating, recenze} = one
            return <div className={styles.oneUser} key={id}>
                <img src={pfp||defaultPfp} alt="" className={styles.pfp}/>
                <p className={styles.name}>{name} {lastName}</p>
                <p className={styles.bio}>{bio||' '}</p>
                <div className={styles.bottom}>
                    <div className={styles.starWrapp}>
                        <Stars rating={rating} className={styles.star} />
                    </div>
                    <p className={styles.rating}>{recenze?recenze.length:'0'} {recenze&&recenze.length<5?'recenze':'recenzí'}</p>
                    <button className={styles.btn} onClick={()=>handleShowProfile(id)}>Přejít na profil</button>
                </div>
                
            </div>
        })}
        </div>

    </div>
  )
}

export default SearchingZakaznik