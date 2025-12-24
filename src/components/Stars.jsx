import { useEffect, useState } from 'react'
import y from '../img/stars/CelaHvezda.png'
import g from '../img/stars/PrazdnaHvezda.png'
import h from '../img/stars/PulHvezda.png'

const Stars = (props) => {
    const [stars, setStars] = useState([g,g,g,g,g])
    const {className, rating, style} = props

    useEffect(()=>{
        const loadStars = ()=>{
          const flooredRating = Math.round(rating*2)/2
            const starsArr = []
            const full = Math.floor(flooredRating)
            const half = flooredRating % 1 >= 0.5 ? 1 : 0
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
        <img style={style} className={className} src={stars[0]} alt="" />
        <img style={style} className={className} src={stars[1]} alt="" />
        <img style={style} className={className} src={stars[2]} alt="" />
        <img style={style} className={className} src={stars[3]} alt="" />
        <img style={style} className={className} src={stars[4]} alt="" />
    </>
  )
}

export default Stars