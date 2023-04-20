import { ReactComponent as Like } from "./like.svg"
import './Card.css'
import { Link } from "react-router-dom"
import React from "react"
import { findLike } from "../../utils/utils"
import { useDispatch, useSelector } from "react-redux"
import { fetchChangeProductLike } from "../../storage/products/productSlice"

export const Card = ({
    product, 
    name, 
    pictures, 
    discount, 
    price, 
    wight, 
    setParentCounter
})=> {

    const currentUser = useSelector(s=>s.user.data)
    const dispatch= useDispatch()

    const isLiked = findLike(product, currentUser);
    const handleLikeClick= ()=>{
        dispatch(fetchChangeProductLike(product))
    // onProductLike(product);
}    
    
    return (
        <div className="card">
            <div className="card__sticky card__sticky_type_top-left">
            {!!product.discount && (
          <span className="card__discount">-{discount}%</span>)}
                </div>
            <div className="card__sticky card__sticky_type_top-right">
             <button className={`card__favorite ${isLiked ? 'card__favorite_active': 'card__favorite_not_active'}`}
                onClick = {handleLikeClick} >
            <Like className="card__liked"/>
            {product.likes.length}
                </button>
                </div>
<Link to={`/product/${product._id}`} className="card__link">
    <img src= {pictures} alt="" className="card__image"/>
    <div className="card__desc">
        <span className="card__price">{price}р</span>
        <span className="card__wight">{wight}</span>
        <p className="card__name">{name}</p>
    </div>
</Link>
<span
onClick={()=>setParentCounter((state)=>state+1)} 
className="card__card btn btn_type_primary" >В корзину</span>
        </div>
    )
}