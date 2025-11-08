import imageContent from '../img/backBtn.png'
import './styles/BackBtn.css'

const BackBtn = ({onClick, show, type='button'}) => {
  return show? (< button
    onClick={onClick}
    type={type}
    
    className='back-btn'
    ><img src={imageContent} alt="<" /></button>
  ) : null
}

export default BackBtn