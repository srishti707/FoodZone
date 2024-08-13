import React from 'react'
import { createPortal } from 'react-dom'
import { useRef,useEffect } from 'react';
const Modal = ({children,open,onClose,className=''}) => {

    const dialog=useRef();

 useEffect(()=>{
    const modal=dialog.current;
    if(open){

     modal.showModal();
    }
    return ()=>modal.close(); //cleanup function will only run when open changes.ie.the progress state changes.
 },[open])

    return createPortal(
   <dialog ref={dialog} className={`modal ${className}`}>
{children}
   </dialog>,document.getElementById('modal') );
}

export default Modal
