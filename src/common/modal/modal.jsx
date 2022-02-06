import './modal.scss';
import Close from '../../assets/icons/close.svg';
import { useState } from 'react';

const Modal = (props) => {

    const { children, title, hideClose, showModal, closeHandler } = props;

    const closeModal = () => {
        closeHandler();
    }

    return(
        showModal && <div className='modal_container'>
            <div className='modal_content'>
                <div className='title_section'>
                    {title && <div className='title'>{title}</div>}
                    {!hideClose && <div className='icon_area' onClick={closeModal}><img src={Close} alt="close" /></div>}
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;