import { useEffect, useState } from 'react'
import y from '../img/stars/CelaHvezda.png'
import g from '../img/stars/PrazdnaHvezda.png'
import h from '../img/stars/PulHvezda.png'

const Stars = (props) => {
    const [stars, setStars] = useState([g,g,g,g,g])
    const {className, rating} = props

    useEffect(()=>{
        const loadStars = ()=>{
            const starsArr = []
            const full = Math.floor(rating)
            const half = rating % 1 >= 0.5 ? 1 : 0
            const empty = 5 - full - half

            for (let i = 0; i < full; i++) starsArr.push(y)
            if (half) starsArr.push(h)
            for (let i = 0; i < empty; i++) starsArr.push(g)
            
            return starsArr
        }
        setStars(loadStars())
    },[rating])
  return (
    <>
        <img className={className} src={stars[0]} alt="" />
        <img className={className} src={stars[1]} alt="" />
        <img className={className} src={stars[2]} alt="" />
        <img className={className} src={stars[3]} alt="" />
        <img className={className} src={stars[4]} alt="" />
    </>
  )
}

export default Stars