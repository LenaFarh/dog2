import { useContext } from "react"
import { Cards } from "../../component/Cards/Cards"
import { Sort } from "../../component/Sort/Sort"
import { CardContext } from "../../context/cardContext"
import { getAnswer } from "../../utils/utils"

export const CatalogtPage =({statSarch, setParentCounter, handleProductLike})=>{
    const cards = useContext(CardContext)
    return  <>
    {statSarch && (
    <p>По запросу {statSarch} найдено {cards?.length} {getAnswer(cards.length)}
    </p>
    )}
    <Sort></Sort>
    <Cards 
    setParentCounter={setParentCounter} 
    handleProductLike={handleProductLike} 
    />
    </>
}