
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import './Avatar.css';

export const Avatar =()=> {
    const {currentUser} = useContext(UserContext);
return (
    <a href="/" className='avatar-container'>
        <img src={currentUser.avatar} alt='аватар' className='ava'/>
    </a>
)
}