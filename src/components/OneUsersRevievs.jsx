import defaultPfp from '../img/pfp-default.png'
import Stars from './Stars'
import Reviev from './RevievCard'
import styles from '../styles/OneUsersRevievs.module.css'

const OneUserReviev = ({data}) => {
  const {name, lastName, pfp, recenze, rating} = data

  return (
    <div className={styles.container}>
      <div>
        <img className={styles.img} src={pfp||defaultPfp} alt="" />
        <div className={styles.starWrapp}>
          <Stars className={styles.star} rating={rating}/>
        </div>
        <button className={styles.btn}>Přidat</button>
      </div>
      <div>
        <h3 className={styles.heading}>Recenze pro <br />{name} {lastName}</h3>
        <div className={styles.wrapp}>
          {recenze?recenze.map((one)=>{
            return <Reviev data={one}/>
          }):<p className={styles.text}>Tady zatím nic není</p>}
        </div>
      </div>
    </div>
  )
}

export default OneUserReviev