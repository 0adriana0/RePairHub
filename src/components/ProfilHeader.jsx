import maleLogo from '../img/logo-small.png'
import './styles/ProfilHeader.css'
import BackBtn from './BackBtn'

const ProfilHeader = ({nadpisText, showBackBtn, backBtnOnClick, backBtnType}) => {
  return <header className='profil-header'>
    <BackBtn 
      show={showBackBtn} 
      onClick={backBtnOnClick} 
      type={backBtnType}
    />
    <img src={maleLogo} alt="" />
    <h2>{nadpisText}</h2>
  </header>
}

export default ProfilHeader