import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import './Footer.css';

import telegram from './img/telegram.svg';
import whatsapp from './img/whatsapp.svg';
import vk from './img/vk.svg';
import viber from './img/viber.svg';
import instagram from './img/instagram.svg';

export const Footer =()=> {
    return (
    <div className = 'footer'>
        <div className='contain'>
            <div className='footer__wrap'>
                <div className='footer__logo footer__links'>
                <Logo/>
                <a href='/'>"Интернет-магазин DogFood.ru"</a>
                </div>
    <div className="footer__links footer__group">
      <a href='/'>Каталог</a>
      <a href='/'>Акции</a>
      <a href='/'>Новости</a>
      <a href='/'>Отзывы</a>
    </div>
      <div className="footer__links footer__group">
        <a href="/">Оплата и доставка</a>
        <Link to={"/faq"}>Часто спрашивают</Link>
        <a href="/">Обратная</a>
        <a href="/">Контакты</a>
      </div>
      <div className="footer__group">
      <h4>Мы на связи</h4>
      <div className="footer__links">
         <a href="tel:7999000000" className='tel'><h3>+7 (999) 00-00-00</h3></a>
         <a href="/">dogfood@gmail.com</a>
         <ul className='socials contacts_socials'>
                            <li className=''>
                                <a href='/'>
                                    <img src={telegram} alt="" />
                                </a>
                            </li>
                            <li className=''>
                                <a href='/'>
                                    <img src={instagram} alt="" />
                                </a>
                            </li>
                            <li className=''>
                                <a href='/'>
                                    <img src={vk} alt="" />
                                </a>
                            </li>
                            <li className=''>
                                <a href='/'>
                                    <img src={viber} alt="" />
                                </a>
                            </li>
                            <li className=''>
                                <a href='/'>
                                    <img src={whatsapp} alt="" />
                                </a>
                            </li>
                        </ul>

      </div>
    </div>
    </div>
  </div>
  </div>
    )}