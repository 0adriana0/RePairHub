import BackBtn from "./BackBtn"
import smallLogo from '../img/logo-small.png'
import { useNavigate } from "react-router-dom"

const PublicProfileHeader = ({text, backBtnNavigateTo}) => {
    const navigate = useNavigate()
    
    const styles = {
            header:{
                width: '100vw',
                display: 'flex',
                justifyContent: 'center'
            },
            logo:{
                position: 'absolute',
                right: '2.5%',
                top: '1.2%'
            },
            heading:{
                fontSize: '16pt',
                margin: 0,
                marginTop: '25%',
                padding: '15px 12px 10px',
                backgroundColor: '#034E46',
                width: '50%',
                borderRadius: '22px 22px 0 0',
            }
    }
  return (
    <header style={styles.header}>
            <BackBtn show={true} onClick={()=>{navigate(backBtnNavigateTo)}}/>
            <img style={styles.logo} src={smallLogo} alt="" />
            <h2 style={styles.heading}>{text}</h2>
        </header>
  )
}

export default PublicProfileHeader