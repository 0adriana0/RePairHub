import { useState } from 'react'
import '../styles/NotificationsOpravar.css'
import bell from '../img/Footer/white/zvonek.png'

const NotificationsOpravar = () => {
    const [notifications, setNotifications] = useState([{notificationName:'asadfadfead',notificationContent: 'asdeadzfuhgdazifghahfdaizhfzieahizfhzdiaa'}, {notificationName:'asad',notificationContent: 'asdeadzfuhgdazifghahf daizhfzieahizfhzasdasdFuhaufh aukhfziahfuhaugdhuodiaa asd aafasferadf as aef dad g sadasd'},{notificationName:'asasdadgad',notificationContent: 'asdeadzfuhgdazifghahfdaizhfzieahizfhzdiaa'}, {notificationName:'asaddyhg',notificationContent: 'asdeadzfuhgdazifghahf daizhfzieahizfhzasdasdFuhaufh aukhfziahfuhaugdhuodiaa asd aafasferadf as aef dad g sadasd'},{notificationName:'asaaaaad',notificationContent: 'asdeadzfuhgdazifghahfdaizhfzieahizfhzdiaa'}, {notificationName:'asadafaerfdd',notificationContent: 'asdeadzfuhgdazifghahf daizhfzieahizfhzasdasdFuhaufh aukhfziahfuhaugdhuodiaa asd aafasferadf as aef dad g sadasd'}])
    const [removedNotifications, setRemovedNotifications] = useState([])

    
  return (
    <div className='notifications-opravar'>
        <h2>Oznámení</h2>
        <p className='vase-oznameni'>{notifications.length?'Vaše oznámení:':'Nemáte žádná oznámení'}</p>
        {notifications.map((one, index)=>{
            const {notificationName, notificationContent} = one
            if (!removedNotifications.includes(one)) return <div className='oneNotification' key={index}>
                <img src={bell} alt="" />
                <div className='notification-texts-div'>
                    <p className='notification-name'>{notificationName||'test'}</p>
                    <p className='notification-content'>{notificationContent||'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia distinctio iure sit aliquam'}</p>
                </div>
                <button onClick={()=>setRemovedNotifications([...removedNotifications, one])} className='notification-remove-btn'>Smazat</button>
        </div>
        })}
        
    </div>
  )
}

export default NotificationsOpravar