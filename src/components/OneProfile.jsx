import defaultPfp from '../img/pfp-default.png'
import Stars from './Stars'
import styles from '../styles/OneProfile.module.css'


const OneProfile = ({user}) => {
    const {name, lastName, pfp, location, allSkills, rating, bio} = user
  return (
    <div className={styles.container}>
            <img src={pfp||defaultPfp} alt="" className={styles.pfp}/>
            <h3 className={styles.name}>{name} {lastName}</h3>
            <p className={styles.location}>{location}</p>
            <div className={styles.btmWrapp}>
              <div>
                <div className={styles.starWrapp}>
                  <Stars rating={rating} className={styles.stars}/>
                </div>
                <button className={styles.btn}>Zobrazit recenze</button>
                <button className={styles.btn}>Zobrazit vzdělání</button>
              </div>
              <ul className={styles.skills}>
                  <p className={styles.text}>Co umím?</p>
                  {allSkills.map((one)=>{
                      return <li key={one} className= {styles.skill}>{one}</li>
                  })}
              </ul>
            </div>
            <p className={styles.bio}>{bio}</p>
    </div>
  )
}

export default OneProfile