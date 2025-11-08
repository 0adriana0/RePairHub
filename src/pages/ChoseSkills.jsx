import { useState } from 'react'
import Button from '../components/Button'
import '../styles/ChoseSkills.css'
import { useNavigate } from 'react-router-dom'
import { updateDoc,doc, getDoc } from 'firebase/firestore'
import { auth,db } from '../firebase'

const ChoseSkills = () => {
  const navigate = useNavigate()
  const [oneEducation, setOneEducation]= useState('')
  const [educations, setEducations] = useState([])
  const [oneCertificate, setOneCertificate] = useState('')
  const [certificates, setCertificates] = useState([])
  const [allSkills, setAllSkills] = useState([])

  const [addedEducationInputs, setAddedEducationInputs] = useState([''])
  const [disabledEducationsInputs, setdisabledEducationsInputs] = useState([])
  const [addedCertificateInputs, setAddedCertificateInputs] = useState([''])
  const [disabledCertificatesInputs, setdisabledCertificateInputs] = useState([])

  // Checkboxy 
  const checkboxChange = (e) => {  
    const { value, checked } = e.target
    setAllSkills((p) =>
      checked ? [...p, value]:p.filter((skill) =>skill !== value)
    )
  
}

  // Submity formulářů
  

  // Přidávání inputů
  const handleAddNewEducationInput = (e)=>{
    e.preventDefault()
    const add=()=>{
      setdisabledEducationsInputs([...disabledEducationsInputs, disabledEducationsInputs.length])
      setEducations((p)=>[...p, oneEducation])
      setAddedEducationInputs((p)=>[...p, ''])
    }
    oneEducation && add()
    
  }

  const handleAddNewCertificateInput = (e)=>{
    e.preventDefault()
    const add=()=>{
      setdisabledCertificateInputs([...disabledCertificatesInputs, disabledCertificatesInputs.length])
      setCertificates((p)=>[...p, oneCertificate])
      setAddedCertificateInputs((p)=>[...p, ''])
    }
    oneCertificate && add()
    
  }


  // Potvrzení všeho
  const submitAll = ()=>{
    const allEducations = [...educations, oneEducation]
    const allCertificates = [...certificates, oneCertificate]
    console.log(allCertificates, allEducations);


    const handleSubmitAll = async ()=>{
      const user = auth.currentUser
      user || alert("Nikdo není přihlášen")
      
      try{
        const userRef = doc(db, 'users', user.uid)
        await updateDoc(userRef, {educations: allEducations, certificates: allCertificates, allSkills})
        const role = (await getDoc(userRef)).data().actualRole
        role === 'opravář' ? navigate('/profil-opravar') : navigate('/profil-zakaznik')
    } catch(err) {alert(err.message)}
    }
    allSkills.length>0&&allEducations.length>0 ? handleSubmitAll(): alert('Musíte něco umět a mít nějaké vzdělání')

  }
  return (
    <div className="chose-skills">
      <form className='educations-form'>
        <label htmlFor="educations">Všechna dosažená vzdělání</label>
       {addedEducationInputs.map((n, index)=>{
            return  <input 
                      key={index}
                      type="text" 
                      placeholder={addedEducationInputs.length===1? 'Střední odborné učiliště...':'Vaše další vzdělání'}
                      disabled={index < addedEducationInputs.length-1}
                      name='educations'
                      value={educations[index]}
                      onChange={(e)=>setOneEducation(e.target.value)}
                    />
          })}
        {addedEducationInputs.length<4 && <button className='add-new-input-btn' onClick={(e)=>handleAddNewEducationInput(e)}>+</button>
        }

        {addedEducationInputs.length>1 && <button className='add-new-input-btn' onClick={(e)=>{
          e.preventDefault()
          setAddedEducationInputs(addedEducationInputs.slice(0,-1))
          setdisabledEducationsInputs(disabledEducationsInputs.slice(0,-1))
          setOneEducation('')
          setEducations(educations.slice(0,-1)) 
        }}>-</button>}
      </form>

      <form className='certificates-form'>
        <label htmlFor="certificates">Všechny certifikáty</label>
        {addedCertificateInputs.map((n, index)=>{
            return  <input 
                      key={index}
                      type="text" 
                      placeholder={addedCertificateInputs.length===1? 'AJ-B2':'Vaše další certifikáty'}
                      disabled={index < addedCertificateInputs.length-1}
                      name='certificates'
                      value={certificates[index]}
                      onChange={(e)=>setOneCertificate(e.target.value)}
                    />
          })}
        {addedCertificateInputs.length<6 && <button className='add-new-input-btn' onClick={(e)=>handleAddNewCertificateInput(e)}>+</button>
        }

        {addedCertificateInputs.length>1 && <button className='add-new-input-btn' onClick={(e)=>{
          e.preventDefault()
          setAddedCertificateInputs(addedCertificateInputs.slice(0,-1))
          setdisabledCertificateInputs(disabledCertificatesInputs.slice(0,-1))
          setOneCertificate('')
          setCertificates(certificates.slice(0,-1)) 
        }}>-</button>}
      </form>
      <p className='co-umis'>Co umíš?</p>
      <form className='skills-form half'>
        <div className='first-half'>
        <p>Elektrika <input type="checkbox" value='Elektrika'
          onChange={(e)=>checkboxChange(e)}/></p>
        <p>Kola apod. <input type="checkbox" value='Kola apod.'
          onChange={(e)=>checkboxChange(e)}/></p>
        <p>Auto <input type="checkbox" value='Auto'
          onChange={(e)=>checkboxChange(e)}/></p>
        <p>Elektronika <input type="checkbox" value='Elektronika'
          onChange={(e)=>checkboxChange(e)}/></p>
        <p>Voda <input type="checkbox" value='Voda'
          onChange={(e)=>checkboxChange(e)}/></p>
      </div>
      <div className='second-half'>
        <p>Nábytek <input type="checkbox" value='Nábytek'
          onChange={(e)=>checkboxChange(e)}/></p>
        <p>Oblečení <input type="checkbox" value='Oblečení'
          onChange={(e)=>checkboxChange(e)}/></p>
        <p>Vrtat <input type="checkbox" value='Vrtat'
          onChange={(e)=>checkboxChange(e)}/></p>
        <p>Seřídit okna <input type="checkbox" value='Seřídit okna'
          onChange={(e)=>checkboxChange(e)}/></p>
        <p>Něco jiného <input type="checkbox" value='Něco jiného'
          onChange={(e)=>checkboxChange(e)}/></p>
      </div>
      </form>
    <Button onClick={submitAll}>Pokračovat</Button>
    </div>
  )
}
export default ChoseSkills