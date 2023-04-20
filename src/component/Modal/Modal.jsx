import cn from 'classnames';
import './Modal.css';
import { useEffect } from 'react';
import { useCallback } from 'react';

export const Modal =({activeModal, children, setShowModal})=>{

 const onModalKeyDown=useCallback((e)=>{
if (e.key==='Escape'){
    setShowModal(false)   
}},[setShowModal])

 useEffect(()=>{
document.addEventListener('keydown', onModalKeyDown)
return ()=>{document.removeEventListener('keydown', onModalKeyDown)}
 },[onModalKeyDown])
    return (
        <>
        <div className={cn('modal', {['active']: activeModal})} 
        // onClick={()=>setShowModal(false)}
        >
        <div className={cn('modal_content', {['active']: activeModal})} onClick={(e)=>e.stopPropagation()}>{children}</div>
        </div>
        </>
    )
}