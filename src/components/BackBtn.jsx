import imageContent from '../img/backBtn.png'
import './styles/BackBtn.css'

const BackBtn = ({onClick, show, type='button'}) => {
  return <button
    onClick={onClick}
    type={type}
    
    className={show ? 'back-btn': 'hidden'}
    ><img src={imageContent} alt="<" /></button>
}

export default BackBtn