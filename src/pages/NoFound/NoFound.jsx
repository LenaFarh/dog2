
import { useNavigate } from 'react-router-dom';
import './NoFound.css';

export const NoFound =()=>{
const navigate = useNavigate();

    return (
        <div className="no_found">Простите, ничего не найдено.
        <button className='btn_found' onClick={()=> navigate('/')}>На главную</button>
        </div>
    )
}