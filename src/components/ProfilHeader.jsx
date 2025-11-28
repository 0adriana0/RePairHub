import maleLogo from '../img/logo-small.png'
import BackBtn from './BackBtn'

const ProfilHeader = ({nadpisText, showBackBtn, backBtnOnClick, backBtnType}) => {
  const styles = {
    container: {
      height: '20vh',
      backgroundColor: '#009B73',
      borderRadius:'0 0 26px 26px',
      textAlign: 'end'
    },
    img: {
      margin: '10px 10px 0 0'
    },
    heading: {
      marginTop: 0
    }
  }


  return <header style={styles.container}>
    <BackBtn 
      show={showBackBtn} 
      onClick={backBtnOnClick} 
      type={backBtnType}
    />
    <img src={maleLogo} alt="" style={styles.img} />
    <h2 style={styles.heading}>{nadpisText}</h2>
  </header>
}

export default ProfilHeader