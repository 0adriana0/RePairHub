import '../styles/HomeOpravar.css'
import inserateStyles from '../styles/OneInserate.module.css'
import logo from '../img/logo.png'
import { useEffect, useState } from 'react'
import { db, auth} from '../firebase'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import defaultPfp from '../img/pfp-default.png'
import chatBtn from '../img/Chat btn.png'

const HomeOpravar = () => {
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const [inserates, setInserates] = useState([{
        pfp: defaultPfp,
        name: 'Jméno',
        lastName: 'Příjmení',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eius.',
        img1: logo,
        img2: defaultPfp
    },{
        pfp: defaultPfp,
        name: 'Jméno',
        lastName: 'Příjmení',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eius.',
        img1: logo,
        img2: defaultPfp
    },{
        pfp: defaultPfp,
        name: 'Jméno',
        lastName: 'Příjmení',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eius.',
        img1: logo,
        img2: defaultPfp
    }])

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
        loadData()
    },[navigate])

  return (
    <div className='home-opravar-all'>
        <header>
            <img src={logo} alt="" />
            <p className='text-top welcoming'>Výtejte v aplikaci RePairHub</p>
            <p className='name text-top'>{name||'Jméno'}!</p>
            <hr/>
            <p className='nasi-zakaznici'>Naši zákazníci</p>
        </header>
        <div className="home-opravar">
            {inserates.map((one, index)=>{
                const {id, pfp, name, lastName, description, img1, img2} = one
                return <div key={index} className={inserateStyles.oneInserate}>
                    <img className={inserateStyles.userPfp} src={pfp} alt="" />
                    <p className={inserateStyles.userNameLastName}>{name} {lastName}</p>
                    <p className={inserateStyles.inserateDescription}>{description}</p>
                    <div className={inserateStyles.inserateBottom}>
                        <div className={inserateStyles.wrapper}>
                            <img className={inserateStyles.inserateImages} src={img1} alt="" />
                        </div>
                        <div className={inserateStyles.wrapper}>
                            <img className={inserateStyles.inserateImages} src={img2} alt="" />
                        </div>
                        <button className={inserateStyles.showMoreBtn} onClick={()=>navigate(`/inzerat/${id}`)}>Zobrazit více</button>
                    </div>
                </div>
            })}
            <img className='chat-btn' src={chatBtn} alt="" onClick={()=>navigate('/chat')}/>
        </div>
    </div>
  )
}

export default HomeOpravar