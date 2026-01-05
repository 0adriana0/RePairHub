import { useNavigate } from 'react-router-dom'
import defaultPfp from '../img/pfp-default.png'
import Stars from './Stars'

const Reviev = ({data, uid}) => {
    const {pfp, stars, content, id} = data
    const navigate = useNavigate()

    const styles = {
        container: {
            backgroundColor: '#009B73',
            width: '94%',
            height: '90px',
            borderRadius: '6px',
            padding: '5px',
            marginBottom: '12px'
        },
        top: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        img:{
            width: '30px',
            height: '30px',
            borderRadius: '50%'
        },
        content:{
            fontSize:'8pt',
            width: '100%',
            height: '59%',
            margin: 0,
            marginTop: '1.5px',
            textAlign: 'start',
            overflowY: 'scroll'
        },
        star:{
            height: '12pt',
            width: '12pt'
        }
    }
  return (
    <div style={styles.container} onClick={()=>navigate(`/revievs/${uid}/${id}`)}>
        <div style={styles.top}>
            <img style={styles.img} src={pfp||defaultPfp} alt="" />
            <div><Stars rating={stars} style={styles.star }/></div>
        </div>
        <p style={styles.content}>{content}</p>
    </div>
  )
}

export default Reviev