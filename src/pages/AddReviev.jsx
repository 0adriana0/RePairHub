import styles from '../styles/AddReviev.module.css'
import PublicProfileHeader from '../components/PublicProfileHeader'
import { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import defaultPfp from '../img/pfp-default.png'
import Stars from '../components/Stars'
import Button from '../components/Button'
import { useLocation } from 'react-router-dom'

const AddReviev = () => {
    const location = useLocation()
    const uid = location.pathname.split('/')[2]

    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null)
    const {id, name, lastName, pfp} = !loading ? userData: {}
    const [recenze, setRecenze] = useState(null)

    const [adding, setAdding] = useState(false)

    const [inputText, setInputText] = useState('')
    const [select, setSelect] = useState(0) 

    const handleAdd = async ()=>{
        setAdding(true)
        const userRef = doc(db, 'users', uid)
        const newReviev = {
                name, lastName, pfp , content: inputText, stars: select, id: new Date().getTime()+'_'+id
            }
        try{
            const rates = recenze.map(one=>one.stars)
            // rates.push(Number(select))    
            console.log(rates);
                        
            const newRating = rates.reduce((a, b)=> a+b)/rates.length
            console.log(newRating);
            
            await updateDoc(userRef, {rating: newRating,/* recenze: [...recenze, newReviev]*/})
        }catch(err) {console.log(err)}
        finally{setAdding(false); alert('Úspěšně přidáno!')}
    }

    // Data uživatele
    useEffect(()=>{
        const load = async ()=>{
            const uid = auth.currentUser.uid
            const userRef = doc(db, 'users', uid)
            try{
                const snap = await getDoc(userRef)
                setUserData(snap.data());
                
            }catch (err){console.log(err)}
            finally {setLoading(false)}
        }

        load()
    },[])

    // Data opraváře
    useEffect(()=>{
        const load = async ()=>{
            const userRef = doc(db, 'users', uid)
            try{
                const snap = await getDoc(userRef)
                const {recenze} = snap.data()
                setRecenze(recenze)
            } catch(err) {console.log(err)}
            
            
        }

        load()
    })

  return (
    <div className={styles.container}>
        <PublicProfileHeader text={'Nová recenze'} backBtnNavigateTo={`/revievs/${uid}`}/>
        <div className={styles.main}>
            <div className={styles.wrapp}>
                <img src={pfp||defaultPfp} alt="" className={styles.pfp}/>
                <h3 className={styles.heading}>{name} {lastName}</h3>
                <div className={styles.starWrapp}>
                    <Stars rating={select} className={styles.star}/>
                    <select className={styles.select} onChange={(e)=>setSelect(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
          </div>
            <p className={styles.text}>Váš komentář:</p>
            <p 
                contentEditable 
                suppressContentEditableWarning
                className={styles.input}
                value={inputText}
                onInput={(e)=>{setInputText(e.currentTarget.textContent);
                }}
            >{!inputText&&'Zde prosím napište svůj komentář'}</p>
        </div>
        <div style={{width:'60%'}}>
            <Button onClick={()=>handleAdd()}>{adding?'Přidávám recenzi...':'Přidat recenzi'}</Button>
        </div>
    </div>
  )
}

export default AddReviev