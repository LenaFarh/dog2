
import './Avatar.css';

export const Avatar =({user})=> {
return (
    <a href="/" className='avatar-container'>
        <img src={user.avatar} alt='аватар' className='ava'/>
    </a>
)
}