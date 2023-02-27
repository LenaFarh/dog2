
import { useNavigate } from 'react-router-dom';
import './NoFound.css';

export const NoFound =()=>{
const navigate = useNavigate();

    return (
        <div className="no_found">404 no found
        <button className='btn_found' onClick={()=> navigate('/')}>Home</button>
        </div>
    )
}