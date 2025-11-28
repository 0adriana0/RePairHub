import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const ChangeRoleBtn = () => {

    const style = {
        color: 'white',
        backgroundColor: '#7C778A',
        border: 'none',
        margin: 0,
        marginBottom: '1rem',
        padding: '2.5% 4.5%',
        borderRadius: '7px',
        fontSize: '13px'
    }

    const navigate = useNavigate()

    const [role, setRole] = useState(null)
    
    const switchRole = async ()=>{
        try {
            const newRole = role === 'opravář' ? 'zákazník' : 'opravář'
            setRole(newRole)
            const user = auth.currentUser
            const userRef = doc(db, 'users', user.uid)
            await updateDoc(userRef, { actualRole: newRole })
            console.log(`Role změněna na: ${newRole}`)
            newRole === 'opravář'? navigate('/profil-opravar') : navigate('/profil-zakaznik')
        } catch(err) {alert(err.message)}
    }

    useEffect(()=>{
        const loadData = async ()=>{
            const user = auth.currentUser
            const userRef = doc(db, 'users', user.uid)
            const {actualRole} = (await getDoc(userRef)).data()   
            setRole(actualRole)
        }
        try {loadData()} catch(err) {alert(err.message)}
    },[])
    return <button style={style} onClick={()=>switchRole()}>Změnit roli</button>
}

export default ChangeRoleBtn