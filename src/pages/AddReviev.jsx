import styles from '../styles/AddReviev.module.css'
import PublicProfileHeader from '../components/PublicProfileHeader'
import { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import defaultPfp from '../img/pfp-default.png'
// import Stars from '../components/Stars'
import Button from '../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import y from '../img/stars/CelaHvezda.png'
import g from '../img/stars/PrazdnaHvezda.png'
import h from '../img/stars/PulHvezda.png'

const AddReviev = () => {

    const location = useLocation()
    const uid = location.pathname.split('/')[2]
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null)
    const {id, name, lastName, pfp} = !loading ? userData: {}
    const [recenze, setRecenze] = useState(null)

    const [adding, setAdding] = useState(false)

    const [inputText, setInputText] = useState('')
    const [select, setSelect] = useState(0) 


    // Upravená komponenta Stars
    const Stars = (props) => {
        const [stars, setStars] = useState([g,g,g,g,g])
        const {className, rating} = props

        useEffect(()=>{
            const loadStars = ()=>{
              const flooredRating = Math.round(rating*2)/2
                const starsArr = []
                const full = Math.floor(flooredRating)
                const half = flooredRating % 1 >= 0.5 ? 1 : 0
                const empty = 5 - full - half

                for (let i = 0; i < full; i++) starsArr.push(y)
                if (half) starsArr.push(h)
                for (let i = 0; i < empty; i++) starsArr.push(g)
                
                return starsArr
            }
            setStars(loadStars())
            },[rating])
        return (
            <>
                <img onClick={()=>setSelect(select===1?0:1)} className={className} src={stars[0]} alt="" />
                <img onClick={()=>setSelect(2)} className={className} src={stars[1]} alt="" />
                <img onClick={()=>setSelect(3)} className={className} src={stars[2]} alt="" />
                <img onClick={()=>setSelect(4)} className={className} src={stars[3]} alt="" />
                <img onClick={()=>setSelect(5)} className={className} src={stars[4]} alt="" />
            </>)}

    const handleAdd = async ()=>{
        setAdding(true)
        const userRef = doc(db, 'users', uid)
        const newReviev = {
                name, lastName, pfp , content: inputText, stars: select, id: new Date().getTime()+'_'+id
            }
        try{
            const rates = recenze.map(one=>Number(one.stars))
            rates.push(Number(select))    
            console.log(rates);
                        
            const newRating = rates.reduce((a, b)=> a+b)/rates.length
            console.log(newRating);
            
            await updateDoc(userRef, {rating: newRating, recenze: [...recenze, newReviev]})
            alert('Úspěšně přidáno!')
        }catch(err) {console.log(err); alert('Chyba: '+err.message)}
        finally{setAdding(false); navigate(`/revievs/${uid}`)}
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
            finally {setLoading(false)}
            
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