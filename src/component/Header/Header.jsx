import { Avatar } from '../Avatar/Avatar';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import { User } from '../User/User';
import './Header.css';

export const Header =({setSarch, user})=> {
    return (
    <div className = 'header'>
        <div className='contain'>
            <div className='header__wrap'>
                <div className='header__left'>
                <Logo/>
                <Search setSarch={setSarch}/>
                </div>
                {/*<div>Войти</div>*/}
                <div className='header__rait'>
                    <User user={user}/>
                   <Avatar user={user}/>
                </div>
            </div>
            </div> 
    </div>);
}