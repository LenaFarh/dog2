
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import './Avatar.css';
import { useSelector } from 'react-redux';

export const Avatar =()=> {
    const currentUser = useSelector(s=>s.user.data)
return (
    <a href="/" className='avatar-container'>
        <img src={currentUser.avatar} alt='аватар' className='ava'/>
    </a>
)
}