import LogoSrc from './logo.svg';
import './Logo.css';

export const Logo =()=> {
return (
    <a href="/">
        <img src={LogoSrc} alt="Логотип компании" className='logo-img'/>
    </a>
)
}