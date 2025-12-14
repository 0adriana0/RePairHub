import { background } from '@cloudinary/url-gen/qualifiers/focusOn'
import defaultPfp from '../img/pfp-default.png'
import Stars from './Stars'

const Reviev = ({data}) => {
    const {pfp, stars, content} = data

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
        }
    }
  return (
    <div style={styles.container}>
        <div style={styles.top}>
            <img style={styles.img} src={pfp||defaultPfp} alt="" />
            <div><Stars rating={stars}/></div>
        </div>
        <p style={styles.content}>{content}</p>
    </div>
  )
}

export default Reviev