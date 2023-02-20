
import React, { useEffect, useState } from 'react';
import { Cards } from '../Cards/Cards';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
import { api } from '../../utils/api';
import { getAnswer, useDebounce } from '../../utils/utils';
//import { Product } from '../Product/Product';


function App() {
  const [cards, setCards] = useState([]);
  const [statSarch, setSarch] = useState('');
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

//const clikMi= async()=> {
//await api.addNewProduct()
//}

 useEffect(()=> {
  hendleSearch(DebounceValueInApp)
  console.log({DebounceValueInApp})
 }, [DebounceValueInApp]);

  useEffect(()=>{
    Promise.all([ api.getUsersInfo(), api.getProductList()])
    .then(([userData, productData])=>{
    setCurrentUser(userData)
    setCards(productData.products)
  })
  }, []);


  return (
    <>
<Header setSarch={setSarch} user= {currentUser}/>
<main className='content contain'>
 {/* <button onClick={()=>clikMi()}>Добавить товар</button>*/}
  {statSarch && <p>По запросу {statSarch} найдено {cards.length} {getAnswer(cards.length)}</p>}
<Cards currentUser={currentUser} handleProductLike={handleProductLike} cards={cards} />
{/*<Product currentUser={currentUser}/>*/}
</main>
<Footer/>
    </>
  );
}

export default App;
