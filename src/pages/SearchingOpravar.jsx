import styles from '../styles/SearchingOpravar.module.css'
import inserateStyles from '../styles/OneInserate.module.css'
import greyLupa from '../img/Footer/grey/lupa.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import defaultPfp from '../img/pfp-default.png'
import logo from '../img/logo.png'

const SearchingOpravar = () => {
    const [searchingBar, setSearchingBar] = useState('')
    const navigate = useNavigate()
    const [inserates, setInserates] = useState([{
        pfp: defaultPfp,
        name: 'Jméno',
        lastName: 'Příjmení',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eius.',
        img1: logo,
        img2: defaultPfp
    },{
        pfp: defaultPfp,
        name: 'Jméno',
        lastName: 'Příjmení',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eius.',
        img1: logo,
        img2: defaultPfp
    },{
        pfp: defaultPfp,
        name: 'Jméno',
        lastName: 'Příjmení',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eiusLorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eius.',
        img1: logo,
        img2: defaultPfp
    }])

  return (
    <div className={styles.searchingOpravar}>
        <div className={styles.searchBar}>
            <img className={styles.searchBarImg} src={greyLupa} alt="" />
            <form>
                <input 
                    type="text" 
                    placeholder='Co hledáte?'
                    className={styles.searchBarInput}
                    value={searchingBar}
                    onChange={(e)=>setSearchingBar(e.target.value)}
                    />
            </form>
        </div>
        <p className={styles.searchingResults}>{searchingBar?`Výsledky pro ${searchingBar}:`:'Minule jste hledali:'}</p>
        {inserates.map((one, index)=>{
                const {id, pfp, name, lastName, description, img1, img2} = one
                return <div key={index} className={inserateStyles.oneInserate}>
                    <img className={inserateStyles.userPfp} src={pfp} alt="" />
                    <p className={inserateStyles.userNameLastName}>{name} {lastName}</p>
                    <p className={inserateStyles.inserateDescription}>{description}</p>
                    <div className={inserateStyles.inserateBottom}>
                        <div className={inserateStyles.wrapper}>
                            <img className={inserateStyles.inserateImages} src={img1} alt="" />
                        </div>
                        <div className={inserateStyles.wrapper}>
                            <img className={inserateStyles.inserateImages} src={img2} alt="" />
                        </div>
                        <button className={inserateStyles.showMoreBtn} onClick={()=>navigate(`/inzerat/${id}`)}>Zobrazit více</button>
                    </div>
                </div>
            })}
    </div>
  )
}

export default SearchingOpravar