import './ProfilOpravar.css'
import ProfilHeader from '../components/ProfilHeader'
// import defaultPfp from '../img/pfp-default.png'
// import { auth,db } from '../firebase'
// import { useEffect, useState } from 'react'
// import { doc, getDoc } from 'firebase/firestore'


const ProfilOpravar = () => {
  // const [pfp, setPfp] = useState(defaultPfp)

  // useEffect(()=>{
  //   try{
  //     const user = auth.currentUser
  //     const userRef = doc(db, 'users', user.uid)
  //   } catch(err) {alert(err.message)}
    
  // },[])

  return (<div className='profil-opravar-all'>
    <ProfilHeader nadpisText='Upravit profil' />
      <div className="profil-opravar">
        {/* <img src={pfp} alt="" />
        <button>Moje příspěvky</button>
        <p>Jméno</p>
        <p></p> */}
      </div>
    </div>
  )
}

export default ProfilOpravar