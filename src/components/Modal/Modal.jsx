import React, {useContext} from 'react'
import { ModalContext } from '../../context/ModalContext';
import closeButton from '../../images/close.png';

import './Modal.css'

const Modal = ({title, children, subtitle, submitText, handleSubmit}) => {

    const { setModal } = useContext(ModalContext);
    const handleClose = () => setModal('');


    return (
        <div className='overlay' >
            <div className='modal'>
                <h2 className='title'>{title}</h2>
                <p>{subtitle}</p>
                <button onClick={handleClose} className='close'>
                    <img src={closeButton}></img>
                </button>
                <div className='form'>
                    {children}
                </div>
                <button 
                    className='submit'
                    onClick={handleSubmit}
                >
                    <h3>{submitText}</h3>
                </button>
            </div>
            
        </div>
    )
}

export default Modal
