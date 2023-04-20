import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import './User.css';
import { useSelector } from 'react-redux';

export const User =()=> {
    const currentUser = useSelector(s=>s.user.data)

return (
    <a href="/" className='user-container user__links'>
        <span>{currentUser.name}</span>
        {/* <span>{currentUser.about}</span>
        <span>{currentUser.email}</span> */}
    </a>
)
}