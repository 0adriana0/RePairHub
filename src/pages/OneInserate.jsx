import styles from '../styles/OneInserate.module.css'
import BackBtn from '../components/BackBtn'
import smmallLogo from '../img/logo-small.png'
import defaultPfp from '../img/pfp-default.png'
import { useState } from 'react'
import camera from '../img/camera.png'

const OneInserate = () => {
    const [name, setName] = useState('Jméno')
    const [lastName, setLastName] = useState('Příjmení')
    const [location, setLocation] = useState('Lokace')
    const [desciption, setDescription] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis doloremque voluptatem pariatur sint mollitia delectus rem ipsum illum Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis doloremque voluptatem pariatur sint mollitia delectus rem ipsum illum neque perspiciatis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis doloremque voluptatem pariatur sint mollitia delectus rem ipsum illum neque perspiciatis.')

  return (<div className={styles.container}>
    <header className={styles.header}>
        <BackBtn show={true} />
        <img className={styles.topImage} src={smmallLogo} alt="" />
        <h2 className={styles.heading}>Náhled inzerátu</h2>
    </header>
    <div className={styles.main}>
        <img className={styles.pfp} src={defaultPfp} alt="" />
        <p className={styles.name}>{name} {lastName}</p>
        <a href={`https://www.google.com/maps?q=${location}`} className={styles.location}>{location}</a>
        <p className={styles.description}>{desciption}</p>
        <div className={styles.image_container}>
            <div className={styles.wrapper}><img className={styles.images} src={camera} alt="" /></div>
            <div className={styles.wrapper}><img className={styles.images} src={camera} alt="" /></div>
            <div className={styles.wrapper}><img className={styles.images} src={camera} alt="" /></div>
            <div className={styles.wrapper}><img className={styles.images} src={camera} alt="" /></div>
        </div>
    </div>
    <button
     className={styles.button}
    //  onClick={navigate('CHAT S OPRAVAREM')}
    >Kontaktovat</button>
  </div>)
}

export default OneInserate