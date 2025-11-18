import { useState } from "react"
import styles from '../styles/ChoseRole.module.css'
import workerImg from '../img/o.png'
import customerImg from '../img/z.png'
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import {auth, db} from '../firebase'
import { updateDoc, doc } from "firebase/firestore"


const ChoseRole = () => {
  const [userRole, setUserRole] = useState('')
  const navigate = useNavigate()

  async function submitHandle(){

      const user = auth.currentUser
      user || alert.error("Nikdo není přihlášen")
      try{
        const userRef = doc(db, 'users', user.uid)
        await updateDoc(userRef, {actualRole: userRole})

        userRole==='opravář'? navigate('/chose-skills'): navigate('/profile')
      } catch(err) {alert(err.message)}
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Kdo jste?</h3>
      <div 
        className={styles.buttons}
        onClick={()=>setUserRole('opravář')}
      >
        <img src={workerImg} alt="Opravář" className={`${styles.images} ${styles.workerImage}`}/>
        <p className={styles.texts}>Opravář</p>
      </div>
      <div 
        className={styles.buttons}
        onClick={()=>setUserRole('zákazník')}
      >
        <p className={styles.roleTexts}>Zákazník</p>
        <img src={customerImg} alt="Zákazník" className={`${styles.images} ${styles.customerImage}`} /> 
      </div>

      <Button onClick={submitHandle}>Pokračovat jako {userRole}</Button>
    </div>
  )
}

export default ChoseRole
