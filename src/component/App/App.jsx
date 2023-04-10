
import React, { useEffect, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
import { api } from '../../utils/api';
import { findLike, useDebounce } from '../../utils/utils';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProductPage } from '../../pages/ProductPage/ProductPage';
import { CatalogPage} from '../../pages/CatalogPage/CatalogPage';
import { NoFound } from '../../pages/NoFound/NoFound';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { FaqPage } from '../../pages/FAQ/FaqPage';
import { Favorites } from '../../pages/Favorites/Favorites';
import { Modal } from '../Modal/Modal';
import { Login } from '../Auth/Login/Login';
import { Registr } from '../Auth/Registr/Registr';
import { ResetPass } from '../Auth/ResetPassword/ResetPassword';
import { Profile } from '../Profile/Profile';




function App() {
  const [cards, setCards] = useState([]);
  const [statSarch, setSarch] = useState(undefined);
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [formData, setFormData] = useState([]);
  const [activeModal, setShowModal] = useState(false);
  const [isAuthentificated, setIsAuthentificated] = useState(false)


  const filteredCards = (products, id) => {
  return products;
  //return products.filter((e) => e.author._id === id);
  }

  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => setCards(filteredCards(data, currentUser._id)));
  };

  const debounceValueInApp = useDebounce(statSarch, 500)

  function handleProductLike(product) {
    const isLiked = findLike(product, currentUser);
    isLiked ? api.deleteLike(product._id).then((newCard) => {
      const newCards = cards.map((e) => e._id === newCard._id ? newCard : e);
      setCards(filteredCards(newCards, currentUser._id));
      setFavorites(favor=>favor.filter(f=>f._id !== newCard._id))
    }) : api.addLike(product._id).then((newCard) => {
      const newCards = cards.map((e) => e._id === newCard._id ? newCard : e);
      setCards(filteredCards(newCards, currentUser._id));
      setFavorites(favor=> [...favor, newCard])
    })
  }

  const clikMi = async () => {
    await api.addNewProduct()
  }

  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    handleSearch(debounceValueInApp)
  }, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUsersInfo(), api.getProductList()])
      .then(([userData, productData]) => {
        setCurrentUser(userData);
        const items = filteredCards(productData.products, userData._id);
        setCards(items);
        const fav = items.filter(e=>findLike(e, userData))
        setFavorites(fav)
      })
  }, [isAuthentificated]);

  const setSortCards = (sort) => {
    if (sort === 'Сначала дешевые') {
      const newCards = cards.sort((a, b) => a.price - b.price);
      setCards([...newCards])
    }
    if (sort === 'Сначала дорогие') {
      const newCards = cards.sort((a, b) => b.price - a.price);
      setCards([...newCards])
    }
    if (sort === 'Популярные') {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
      setCards([...newCards])
    }
    if (sort === 'Новинки') {
      const newCards = cards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setCards([...newCards])
    }
    if (sort === 'По скидке') {
      const newCards = cards.sort((a, b) => b.discount - a.discount);
      setCards([...newCards])
    }
  }

  const contextValue = { 
    setSort: setSortCards, 
    statSarch, 
    setSarch, 
    currentUser, 
    setCurrentUser,
    setParentCounter, 
    parentCounter, 
    isAuthentificated, 
  }

  const contextCardValue = { 
    cards, 
    setParentCounter, 
    handleProductLike, 
    favorites, 
    setFavorites,
  }


const navigate = useNavigate();
const location = useLocation();

  useEffect(()=>{
    const token = localStorage.getItem('token')
    //const aushPath = ['/reset-password', '/registr']
    if(token){
      setIsAuthentificated(true)
    //} else if (!aushPath.includes(location.pathname)) {
    //navigate('/login')
    }

  },[navigate])

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <CardContext.Provider value={contextCardValue}>
          <Header setShowModal={setShowModal}/>
          {isAuthentificated ?
          <main className='content contain'>
            <button onClick={() => clikMi()}>Добавить товар</button>
            <Routes>
              <Route path="/" element={<CatalogPage/>}></Route>
              <Route path="/product/:productId" element={<ProductPage />}></Route>
              <Route path="*" element={<NoFound />}></Route>
              <Route path="faq" element={<FaqPage/>}></Route>
              <Route path="favorites" element={<Favorites/>}></Route>
              <Route path="profile" element={<Profile/>}></Route>
              <Route 
              path="login" 
              element={
              <Modal activeModal={activeModal} setShowModal={setShowModal}>
                <Login setShowModal={setShowModal}/>
                </Modal>
              }>
              </Route>
              <Route 
              path="registr" 
              element={
              <Modal activeModal={activeModal} setShowModal={setShowModal}>
                <Registr setShowModal={setShowModal}/>
                </Modal>
              }>
                </Route>
                <Route 
              path="reset-password" 
              element={
              <Modal activeModal={activeModal} setShowModal={setShowModal}>
                <ResetPass setShowModal={setShowModal}/>
                </Modal>
              }>
                </Route>
            </Routes>
          </main>
          : <div className='not__auth'>Пожалуйста, авторизуйтесь
          <Routes>
          <Route 
              path="login" 
              element={
              <Modal activeModal={activeModal} setShowModal={setShowModal}>
                <Login setShowModal={setShowModal}/>
                </Modal>
              }>
              </Route>
              <Route 
              path="registr" 
              element={
              <Modal activeModal={activeModal} setShowModal={setShowModal}>
                <Registr setShowModal={setShowModal}/>
                </Modal>
              }>
                </Route>
                <Route 
              path="reset-password" 
              element={
              <Modal activeModal={activeModal} setShowModal={setShowModal}>
                <ResetPass setShowModal={setShowModal}/>
                </Modal>
              }>
                </Route>
                </Routes>
          </div>}
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
