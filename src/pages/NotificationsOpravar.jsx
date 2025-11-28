import { useState } from 'react'
import styles from '../styles/NotificationsOpravar.module.css'
import bell from '../img/Footer/white/zvonek.png'

const NotificationsOpravar = () => {
    const [notifications, setNotifications] = useState([{notificationName:'asadfadfead',notificationContent: 'asdeadzfuhgdazifghahfdaizhfzieahizfhzdiaa'}, {notificationName:'asad',notificationContent: 'asdeadzfuhgdazifghahf daizhfzieahizfhzasdasdFuhaufh aukhfziahfuhaugdhuodiaa asd aafasferadf as aef dad g sadasd'},{notificationName:'asasdadgad',notificationContent: 'asdeadzfuhgdazifghahfdaizhfzieahizfhzdiaa'}, {notificationName:'asaddyhg',notificationContent: 'asdeadzfuhgdazifghahf daizhfzieahizfhzasdasdFuhaufh aukhfziahfuhaugdhuodiaa asd aafasferadf as aef dad g sadasd'},{notificationName:'asaaaaad',notificationContent: 'asdeadzfuh gdazifghahfd aizhfzieahizfhzdiaa'}, {notificationName:'asadafaerfdd',notificationContent: 'asdeadzfuhgdazifghahf daizhfzieahizfhzasdasdFuhaufh aukhfziahfuhaugdhuodiaa asd aafasferadf as aef dad g sadasd joiuhu ouhuoh ouhulnuo ouhuoh ouhouhu ooubouhuo ljbnlj  lnouhju unbhulhnou ojnlu'}])
    const [removedNotifications, setRemovedNotifications] = useState([])

    
  return (
    <div className={styles.container}>
        <h2 className={styles.heading}>Oznámení</h2>
        <p className={styles.text}>{notifications.length?'Vaše oznámení:':'Nemáte žádná oznámení'}</p>
        <div className={styles.wrapp}>
        {notifications.map((one, index)=>{
            const {notificationName, notificationContent} = one
            return !removedNotifications.includes(one)? <div className={styles.notification} key={index}>
                <img className={styles.img} src={bell} alt="" />
                <div className={styles.textWrapp}>
                    <p className={styles.name}>{notificationName||'test'}</p>
                    <p className={styles.content}>{notificationContent||'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia distinctio iure sit aliquam'}</p>
                </div>
                <button onClick={()=>setRemovedNotifications([...removedNotifications, one])} className={styles.btn}>Smazat</button>
        </div> : <></>
        })}
        </div>
        
    </div>
  )
}

export default NotificationsOpravar
