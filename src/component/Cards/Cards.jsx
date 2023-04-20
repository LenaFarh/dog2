
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import { Card } from "../Card/Card"
import './Cards.css'

export const Cards = ({cards}) => {
    const { setParentCounter} = useContext(CardContext)

    return (
        <div className="cards">
            {cards.map((item) => (
                <Card 
                setParentCounter={setParentCounter}
                product={item} 
                {...item} 
                key={item.id} />
            ))}
        </div>
    );
}