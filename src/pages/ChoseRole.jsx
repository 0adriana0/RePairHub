import { useState } from "react"
import './ChoseRole.css'
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
    <div className="chose-role">
      <h3>Kdo jste?</h3>
      <div 
        className="roles"
        onClick={()=>setUserRole('opravář')}
      >
        <img src={workerImg} alt="Opravář" className="role-images worker-image"/>
        <p>Opravář</p>
      </div>
      <div 
        className="roles"
        onClick={()=>setUserRole('zákazník')}
      >
        <p>Zákazník</p>
        <img src={customerImg} alt="Zákazník" className="role-images customer-image"/> 
      </div>

      <Button onClick={submitHandle}>Pokračovat jako {userRole}</Button>
    </div>
  )
}

export default ChoseRole