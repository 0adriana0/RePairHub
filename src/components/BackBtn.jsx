import imageContent from '../img/backBtn.png'

const BackBtn = ({onClick, show, type='button'}) => {
  const styles = {
    btn: {
      background:'none',
      border: 'none',
      marginTop: '10px',
      position: 'absolute',
      left: '15px'
    },
    img: {
      margin: 0
    },
    hidden: {
      display: 'none'
    }
  }
  return show? (< button
    onClick={onClick}
    type={type}
    
    style={show? styles.btn:styles.hidden}
    ><img style={styles.img} src={imageContent} alt="<" /></button>
  ) : null
}

export default BackBtn