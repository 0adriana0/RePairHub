import maleLogo from '../img/logo-small.png'
import './styles/ProfilHeader.css'

const ProfilHeader = ({nadpisText}) => {
  return <header className='profil-header'>
    <img src={maleLogo} alt="" />
    <h2>{nadpisText}</h2>
  </header>
}

export default ProfilHeader