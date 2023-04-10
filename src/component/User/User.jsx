import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import './User.css';

export const User =()=> {
    const {currentUser} = useContext(UserContext);
return (
    <a href="/" className='user-container user__links'>
        <span>{currentUser.name}</span>
        {/* <span>{currentUser.about}</span>
        <span>{currentUser.email}</span> */}
    </a>
)
}