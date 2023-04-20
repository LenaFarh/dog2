import { Avatar } from '../Avatar/Avatar';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import { User } from '../User/User';
import './Header.css';
import IconBasket from '../Header/IconBasket';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Like } from "../Card/like.svg";
import { ReactComponent as Logohed } from "./images/loginh.svg"
import { ReactComponent as Profil } from "./images/profil.svg"
import { ReactComponent as Logaut } from "./images/logaut.svg"

import { useSelector } from 'react-redux';


export const Header =({setShowModal})=> { 
    const {setSarch, statSarch, parentCounter, isAuthentificated} = useContext(UserContext);
    const {favorites}= useSelector(s=>s.products)


const navigate= useNavigate()

const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
}

    return (
    <div className = 'header'>
        <div className='contain'>
            <div className='header__wrap'>
                <div className='header__left'>
                <Logo/>
                <Search setSarch={setSarch} statSarch={statSarch}/>
                </div>
                <div>
                <IconBasket count={parentCounter}/>   
                </div>
                <div>
                    <Link to={'/favorites'} className="header__bubble-link">
                    <Like className='heder__liked'/>
                   {favorites.length !==0 && <span className='heder_bubble'>{favorites.length}</span>} 
                    </Link>
                </div>
                {!isAuthentificated ? <Link to={'/login'} className="header_link" onClick={()=>setShowModal(true)}>
                <Logohed/>
                </Link> :
                <>
                <Link to={'/profile'} className='header_link' onClick={()=>setShowModal(true)}>
                    <Profil/>
                </Link>
                <span onClick={handleLogout}>
                    <Logaut/>
                </span>
                 <div className='header__rait'> 
                            <User />
                            <Avatar />
                        </div> 
                        </>} 
            </div>
            </div> 
    </div>);
}