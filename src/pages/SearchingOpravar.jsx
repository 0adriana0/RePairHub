import '../styles/SearchingOpravar.css'
import greyLupa from '../img/Footer/grey/lupa.png'
import { useState } from 'react'

const SearchingOpravar = () => {
    const [searchingBar, setSearchingBar] = useState('')

  return (
    <div className='searching-opravar'>
        <div className='search-bar'>
            <img src={greyLupa} alt="" />
            <form>
                <input 
                    type="text" 
                    placeholder='Co hledáte?'
                    value={searchingBar}
                    onChange={(e)=>setSearchingBar(e.target.value)}
                    />
            </form>
        </div>
        <p className='searching-results'>{searchingBar?`Výsledky pro ${searchingBar}`:'Minule jste hledali:'}</p>
    </div>
  )
}

export default SearchingOpravar