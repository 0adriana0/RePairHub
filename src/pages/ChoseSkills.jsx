import { useState } from 'react'
import Button from '../components/Button'
import './ChoseSkills.css'

const ChoseSkills = () => {
  const [oneEducation, setOneEducation]= useState('')
  const [educations, setEducations] = useState([])
  const [oneCertificate, setOneCertificate] = useState('')
  const [certificates, setCertificates] = useState([])
  const [allSkills, setAllSkills] = useState([])

  const checkboxChange = (e) => {  
  const { value, checked } = e.target
  setAllSkills((p) =>
    checked ? [...p, value] : p.filter((skill) => skill !== value)
  )
  console.log(allSkills);
  
}


  const firstFormSubmit = (e)=>{
    e.preventDefault()
    oneEducation ? setEducations([...educations, oneEducation]) : alert('Vyplňtě prosím pole')
    setOneEducation('')
  }
  const secondFormSubmit = (e)=>{
    e.preventDefault()
    oneCertificate ? setCertificates([...certificates, oneCertificate]) : alert('Vyplňtě prosím pole')
    setOneCertificate('')
  }
  return (
    <div className="chose-skills">
      <form onSubmit={firstFormSubmit} className='educations-form'>
        <label htmlFor="educations">Všechna vzdělání</label>
        <input 
          type="text" 
          placeholder='POTVRDIT PO KAŽDÉM VZDĚLÁNÍ'
          name='educations'
          value={oneEducation}
          onChange={(e)=>setOneEducation(e.target.value)}
          />
      </form>

      <form onSubmit={secondFormSubmit} className='certificates-form'>
        <label htmlFor="certificates">Všechny certifikáty</label>
        <input 
          type="text" 
          placeholder='POTVRDIT PO KAŽDÉM CERTIFIKÁTU'
          name='certificates'
          value={oneCertificate}
          onChange={(e)=>setOneCertificate(e.target.value)}
          />
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
    <Button>Pokračovat</Button>
    </div>
  )
}

export default ChoseSkills