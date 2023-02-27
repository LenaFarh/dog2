
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import { Card } from "../Card/Card"
import './Cards.css'

export const Cards = ({handleProductLike, setParentCounter}) => {
    const cards = useContext(CardContext)
    return (
        <div className="cards">
            {cards.map((item) => (
                <Card 
                setParentCounter={setParentCounter}
                product={item} 
                onProductLike={handleProductLike} 
                {...item} 
                key={item.id} />
            ))}
        </div>
    );
}