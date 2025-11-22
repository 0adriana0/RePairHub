import styles from '../styles/SearchingOpravar.module.css'
import inserateStyles from '../styles/OneInseratePrewiew.module.css'
import greyLupa from '../img/Footer/grey/lupa.png'
import camera from '../img/camera.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'
const SearchingOpravar = () => {
    const [searchingBar, setSearchingBar] = useState('')
    const navigate = useNavigate()
    const [lastSearched, setLastSearched] = useState([])
    // const [allInserates, setAllInserates] = useState([{}])
    const [inserates, setInserates] = useState([])
    // Uložení do minule jste hledali
    const showMoreHandler = async (id)=>{
        const uid = auth.currentUser.uid
        const userRef = doc(db, 'users', uid)
        try {
            const lastSearchedPosts = (await getDoc(userRef)).data().lastSearchedPosts
            let filteredLastSearchedPosts = []
            if(lastSearchedPosts){
                filteredLastSearchedPosts = lastSearched&& lastSearchedPosts.filter((one)=>{
                return one !== id&&id
            })
            }
            
            await updateDoc(userRef, {lastSearchedPosts: [id, ...filteredLastSearchedPosts]})
            

            
        } catch(err) {console.log('Chyba. Tento příspěvek se vám nebude ukazovat v historii: '+err.message);}
         navigate(`/one-inserate/${id}`)
    }
    // Text pro searchingResults
    const searchingResult = ()=>{
        return((!!searchingBar&& `Výsledky pro ${searchingBar}:`)||
        (lastSearched.length>0&& 'Minule jste hledali:')||
        (!searchingBar&&!lastSearched.length&&'Návrhy pro vás:')
        )
    }
    
    // Načítání dat
    useEffect(()=>{
        const loadData = async ()=>{
            const uid = auth.currentUser.uid
                try{
                    const lastSearchedSnap = await getDoc(doc(db,'users',uid))
                    const lastSearchedLoad = lastSearchedSnap.data().lastSearchedPosts

                    const snapshot = await getDocs(collection(db, "posts"))
                    setInserates(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
                    lastSearchedLoad&&setLastSearched(snapshot.docs.map(doc=>(
                        lastSearchedLoad.includes(doc.id)
                        && {id:doc.id, ...doc.data()}
                        
                        )))

                } catch(err) {alert(err.message); console.log(err);}
        }

        loadData()
        
    },[])

  return (
    <div className={styles.searchingOpravar}>
        {!auth.currentUser&&navigate('/login')}

        <div className={styles.searchBar}>
            <img className={styles.searchBarImg} src={greyLupa} alt="" />
                <input 
                    type="text" 
                    placeholder='Co hledáte? Př. #nábytek, Novotný'
                    className={styles.searchBarInput}
                    value={searchingBar}
                    onChange={(e)=>setSearchingBar(e.target.value)}
                    />
        </div>
        <p className={styles.searchingResults}>{searchingResult()}</p>
        {searchingBar? inserates.map((one, index)=>{
                const {id, location, pfp, userName, userLastName, description, imageOneURL, imageTwoURL, hashtags} = one
                
                const hashtagsIncluded = ()=>{
                    return hashtags.map((one)=>{
                        const isIncluded = searchingBar.toLowerCase().includes(one.toLowerCase())
                        return isIncluded
                    }).includes(true)
                }

                const show = searchingBar.toLowerCase().includes(userLastName.toLowerCase())||userLastName.toLowerCase().includes(searchingBar.toLowerCase()) ||description.toLowerCase().includes(searchingBar.toLowerCase())|| searchingBar.toLowerCase().includes(location.toLowerCase())||location.toLowerCase().includes(searchingBar.toLowerCase())||hashtagsIncluded()
                return show && <div key={index} className={inserateStyles.oneInserate}>
                    <img className={inserateStyles.userPfp} src={pfp} alt="" />
                    <p className={inserateStyles.userNameLastName}>{userName} {userLastName}</p>
                    <p className={inserateStyles.inserateDescription}>{description}</p>
                    <div className={inserateStyles.inserateBottom}>
                        <div className={inserateStyles.wrapper}>
                            <img className={inserateStyles.inserateImages} src={imageOneURL} alt="" />
                        </div>
                        <div className={inserateStyles.wrapper}>
                            <img className={inserateStyles.inserateImages} src={imageTwoURL||camera} alt="" />
                        </div>
                        <button className={inserateStyles.showMoreBtn} onClick={()=>showMoreHandler(id)}>Zobrazit více</button>
                    </div>
                </div>
            })
            :lastSearched.map((one, index)=>{
                const {id, pfp, userName, userLastName, description, imageOneURL, imageTwoURL} = one
                return one && <div key={index} className={inserateStyles.oneInserate}>
                    <img className={inserateStyles.userPfp} src={pfp} alt="" />
                    <p className={inserateStyles.userNameLastName}>{userName} {userLastName}</p>
                    <p className={inserateStyles.inserateDescription}>{description}</p>
                    <div className={inserateStyles.inserateBottom}>
                        <div className={inserateStyles.wrapper}>
                            <img className={inserateStyles.inserateImages} src={imageOneURL} alt="" />
                        </div>
                        <div className={inserateStyles.wrapper}>
                            <img className={inserateStyles.inserateImages} src={imageTwoURL||camera} alt="" />
                        </div>
                        <button className={inserateStyles.showMoreBtn} onClick={()=>showMoreHandler(id)}>Zobrazit více</button>
                    </div>
                </div>
            }
        )}
        {(!lastSearched.length&&!searchingBar)&&
        inserates.map((one, index)=>{
            const {id, pfp, userName, userLastName, description, imageOneURL, imageTwoURL} = one
            return one && <div key={index} className={inserateStyles.oneInserate}>
                    <img className={inserateStyles.userPfp} src={pfp} alt="" />
                    <p className={inserateStyles.userNameLastName}>{userName} {userLastName}</p>
                    <p className={inserateStyles.inserateDescription}>{description}</p>
                    <div className={inserateStyles.inserateBottom}>
                        <div className={inserateStyles.wrapper}>
                            <img className={inserateStyles.inserateImages} src={imageOneURL} alt="" />
                        </div>
                        <div className={inserateStyles.wrapper}>
                            <img className={inserateStyles.inserateImages} src={imageTwoURL||camera} alt="" />
                        </div>
                        <button className={inserateStyles.showMoreBtn} onClick={()=>showMoreHandler(id)}>Zobrazit více</button>
                    </div>
                </div>
        })
        }
    </div>
  



)}
export default SearchingOpravar