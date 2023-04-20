import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import './Sort.css'
import { useDispatch, useSelector } from 'react-redux'
import { sortedProducts } from '../../storage/products/productSlice'


export const Sort =()=> {
const dispatch= useDispatch()

const {setSort} = useContext(UserContext)   
const sortedItems=[{id:'Популярные'}, 
{id:'Новинки'},  
{id:'Сначала дешевые'},  
{id:'Сначала дорогие'},
{id:'По скидке'}]

const handleSort=(target)=>{
dispatch(sortedProducts(target))
}

    return (
<div className="sort_cards">
{sortedItems.map((e)=>
<span key={e.id} className='sort_item' onClick={()=>handleSort(e.id)}>{e.id}</span>
)}
</div>
    )
}