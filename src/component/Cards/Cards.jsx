
import { Card } from "../Card/Card"
import './Cards.css'

export const Cards = ({ currentUser, cards, handleProductLike }) => {
    return (
        <div className="cards">
            {cards.map((item) => (
                <Card 
                currentUser={currentUser}
                product={item} 
                onProductLike={handleProductLike} 
                {...item} 
                key={item.id} />
            ))}
        </div>
    );
}