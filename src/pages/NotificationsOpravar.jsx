import { useState } from 'react'
import styles from '../styles/NotificationsOpravar.module.css'
import bell from '../img/Footer/white/zvonek.png'

const NotificationsOpravar = () => {
    const [notifications, setNotifications] = useState([{notificationName:'asadfadfead',notificationContent: 'asdeadzfuhgdazifghahfdaizhfzieahizfhzdiaa'}, {notificationName:'asad',notificationContent: 'asdeadzfuhgdazifghahf daizhfzieahizfhzasdasdFuhaufh aukhfziahfuhaugdhuodiaa asd aafasferadf as aef dad g sadasd'},{notificationName:'asasdadgad',notificationContent: 'asdeadzfuhgdazifghahfdaizhfzieahizfhzdiaa'}, {notificationName:'asaddyhg',notificationContent: 'asdeadzfuhgdazifghahf daizhfzieahizfhzasdasdFuhaufh aukhfziahfuhaugdhuodiaa asd aafasferadf as aef dad g sadasd'},{notificationName:'asaaaaad',notificationContent: 'asdeadzfuhgdazifghahfdaizhfzieahizfhzdiaa'}, {notificationName:'asadafaerfdd',notificationContent: 'asdeadzfuhgdazifghahf daizhfzieahizfhzasdasdFuhaufh aukhfziahfuhaugdhuodiaa asd aafasferadf as aef dad g sadasd'}])
    const [removedNotifications, setRemovedNotifications] = useState([])

    
  return (
    <div className={styles.notificationsOpravar}>
        <h2 className={styles.heading}>Oznámení</h2>
        <p className={styles.vaseOznameni}>{notifications.length?'Vaše oznámení:':'Nemáte žádná oznámení'}</p>
        {notifications.map((one, index)=>{
            const {notificationName, notificationContent} = one
            return !removedNotifications.includes(one)? <div className={styles.oneNotification} key={index}>
                <img className={styles.oneNotificationImg} src={bell} alt="" />
                <div className={styles.notificationTextsDiv}>
                    <p className={styles.notificationName}>{notificationName||'test'}</p>
                    <p className={styles.notificationContent}>{notificationContent||'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia distinctio iure sit aliquam'}</p>
                </div>
                <button onClick={()=>setRemovedNotifications([...removedNotifications, one])} className={styles.notificationRemoveButton}>Smazat</button>
        </div> : <></>
        })}
        
    </div>
  )
}

export default NotificationsOpravar
