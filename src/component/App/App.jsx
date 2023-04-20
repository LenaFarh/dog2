
import React, { useEffect, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
import { api } from '../../utils/api';
import { findLike, useDebounce } from '../../utils/utils';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../storage/user/userSlice';
import { fetchProducts, fetchProductsSearch } from '../../storage/products/productSlice';


export const filteredCards = (products, id) => {
  return products;
  //return products.filter((e) => e.author._id === id);
  }

function App() {
  
  const [statSarch, setSarch] = useState(undefined);
  const [parentCounter, setParentCounter] = useState(0);
  const [activeModal, setShowModal] = useState(false);
  const [isAuthentificated, setIsAuthentificated] = useState(false)
  const dispatch= useDispatch()
  
  const currentUser= useSelector(s=>s.user.data)

  const handleSearch = (search) => {
    dispatch(fetchProductsSearch(search))
  };

  const debounceValueInApp = useDebounce(statSarch, 500)


  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    handleSearch(debounceValueInApp)
  }, [debounceValueInApp]);

  useEffect(()=>{
    if(!isAuthentificated){
      return
    }
    dispatch(fetchUser());
  }, [isAuthentificated, dispatch])

 
  const contextValue = { 
    statSarch, 
    setSarch, 
    currentUser, 
    setParentCounter, 
    parentCounter, 
    isAuthentificated, 
    setIsAuthentificated
  }

  const contextCardValue = { 
    setParentCounter, 
  }


const navigate = useNavigate();
// const location = useLocation();

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
            <Routes>
              <Route path="/" element={<CatalogPage activeModal={activeModal} setShowModal={setShowModal}/>}></Route>
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
