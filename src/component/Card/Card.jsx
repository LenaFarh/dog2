import { ReactComponent as Like } from "./like.svg"
import './Card.css'
import { Link } from "react-router-dom"
import React from "react"
import { UserContext } from "../../context/userContext"

export const Card = ({
    product, 
    name, 
    pictures, 
    discount, 
    price, 
    wight, 
    onProductLike,
    setParentCounter
})=> {

    const {currentUser} = React.useContext(UserContext);

    const isLiked = product.likes.some(el=> el===currentUser._id)
    const handleLikeClick= ()=>{
    onProductLike(product);
}    
    
    return (
        <div className="card">
            <div className="card__sticky card__sticky_type_top-left">
            {!!product.discount && (
          <span className="card__discount">-{discount}%</span>)}
                </div>
            <div className="card__sticky card__sticky_type_top-right">
                <button className={`card__favorite ${isLiked ? 'card__favorite_active': ''}`}
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
className="card__cart btn btn_type_primary" >В корзину</span>
        </div>
    )
}