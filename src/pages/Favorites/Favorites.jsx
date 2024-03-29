import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Cards } from "../../component/Cards/Cards"
import { CardContext } from "../../context/cardContext"
import './Favorites.css'
import { useSelector } from "react-redux"

export const Favorites =()=>{
    const {favorites}= useSelector(s=>s.products)
    const navigate = useNavigate()

    return (
        <div className="favorites">
            <span className="favorites_back" onClick={()=>navigate(-1)}>{'< '}Назад</span>
            <h1>Избранное</h1>
            {!!favorites.length ?
            <Cards cards={favorites}/>
            : <div className="no_found">У вас нет избраных товаров.</div>}
        </div>
    )
}