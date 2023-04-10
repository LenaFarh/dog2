import { useCallback, useEffect, useState } from "react";
import {ReactComponent as Star} from './star.svg'
import s from './Rating.module.css';
import cn from 'classnames'

export const Rating =({rate, setRate, currentRating, isEditable= false})=>{
const emtyFragents = new Array(5).fill(<></>)    
const [ratingArr, setRatingArr] = useState(emtyFragents);

const changeDisplay = (rate)=>{
    constructRating(rate)
    if (!isEditable) return;
}

const changeRating = (r)=>{
    if (!isEditable) return;
    setRate(r);
}

const constructRating = useCallback ((rating)=>{
    const updatedArray = ratingArr.map((ratingEl, index)=>
    <Star className={cn(s.star, {
        [s.filled]: index < rating,
        [s.editable]: isEditable 
    })}
    onMouseEnter ={()=>changeDisplay(index + 1)}
    onMouseLeave ={()=>changeDisplay(rate)}
    onClick= {()=>changeRating(index + 1)}
/>)
    setRatingArr(updatedArray);
}, [rate, isEditable])

useEffect(()=>{
    constructRating(rate)
}, [constructRating])

    return (
<div>
{ratingArr.map((e, i)=>(
<span key={i}>{e}</span>
))}
</div>
    )
}