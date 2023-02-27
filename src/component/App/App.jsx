
import React, { useEffect, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
import { api } from '../../utils/api';
import { useDebounce } from '../../utils/utils';
import { Route, Routes } from 'react-router-dom';
import { ProductPage } from '../../pages/ProductPage/ProductPage';
import { CatalogtPage } from '../../pages/CatalogPage/CatalogPage';
import { NoFound } from '../NoFound/NoFound';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';



function App() {
  const [cards, setCards] = useState([]);
  const [statSarch, setSarch] = useState('');
  const [parentCounter, setParentCounter] = useState(0);
const [currentUser, setCurrentUser] = useState({});


const hendleSearch=(serch)=>{
  api.searchProducts(serch).then((data)=>setCards([...data]))
    }  

const DebounceValueInApp = useDebounce(statSarch, 500)

function handleProductLike(product){
  const isLiked= product.likes.some((el)=> el===currentUser._id);
  isLiked ? api.deleteLike(product._id).then((newCard)=>{
    const newCards = cards.map((e)=>e._id === newCard._id ? newCard : e);
    setCards([...newCards]);
  }) : api.addLike(product._id).then((newCard)=>{
    const newCards = cards.map((e)=>e._id === newCard._id ? newCard : e);
    setCards([...newCards]);
})}

const clikMi= async()=> {
await api.addNewProduct()
}

 useEffect(()=> {
  hendleSearch(DebounceValueInApp)
 }, [DebounceValueInApp]);

  useEffect(()=>{
    Promise.all([ api.getUsersInfo(), api.getProductList()])
    .then(([userData, productData])=>{
    setCurrentUser(userData)
    setCards(productData.products)
  })
  }, []);

  const setSortCards= (sort)=>{
    console.log(sort)
   if( sort ==='Сначала дешевые'){
    const newCards = cards.sort((a,b)=>a.price-b.price);
    setCards([...newCards])
   }
   if( sort ==='Сначала дорогие'){
    const newCards = cards.sort((a,b)=>b.price-a.price);
    setCards([...newCards])
   }
   if( sort ==='Популярные'){
    const newCards = cards.sort((a,b)=>b.likes.length-a.likes.length);
    setCards([...newCards])
   }
   if( sort ==='Новинки'){
    const newCards = cards.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
    setCards([...newCards])
   }
if( sort ==='По скидке'){
    const newCards = cards.sort((a,b)=>b.discount-a.discount);
    setCards([...newCards])
   }
  }

  return (
    <>
    <UserContext.Provider value={{currentUser, setSort:setSortCards}}> 
    <CardContext.Provider value={cards}>
<Header parentCounter={parentCounter} 
setSarch={setSarch} 
/>
<main className='content contain'>
 <button onClick={()=>clikMi()}>Добавить товар</button>
  
<Routes>
  <Route path="/" element={
  <CatalogtPage statSarch={statSarch} 
  setParentCounter={setParentCounter} 
  handleProductLike={handleProductLike}/>
  }>
  </Route>
  <Route path="/product/:productId" element={<ProductPage/>}></Route>
  <Route path="*" element={<NoFound/>}></Route>
</Routes>
</main>
<Footer/>
</CardContext.Provider>
</UserContext.Provider> 
    </>
  );
}

export default App;
