import { Avatar } from '../Avatar/Avatar';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import { User } from '../User/User';
import './Header.css';
import IconBasket from '../Header/IconBasket';
import { useEffect, useState } from 'react';


export const Header =({setSarch, statSarch, parentCounter=0})=> { 

    const [counter, setcounter] = useState(parentCounter);
    

useEffect(()=>{
    setcounter((st)=>st+1)  
},[ parentCounter])

    return (
    <div className = 'header'>
        <div className='contain'>
            <div className='header__wrap'>
                <div className='header__left'>
                <Logo/>
                <Search setSarch={setSarch} statSarch={statSarch}/>
                </div>
                <div>
                <IconBasket count={counter}/>   
                </div>
                <div className='header__rait'>
                    <User/>
                   <Avatar/>
                </div>
            </div>
            </div> 
    </div>);
}