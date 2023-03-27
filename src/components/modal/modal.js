import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'
const modalRoot = document.getElementById('modal-root')

const ModalHeader = ({ header, handleCloseModal }) => {
    return (
        <div>
            <div className="mt-2 mb-2">
                <h2 className={styles.title}>{header}</h2>
            </div>
            <div className={styles.modal_close} onClick={handleCloseModal}>
                <CloseIcon type="primary"></CloseIcon>
            </div>
        </div>
    )
}

ModalHeader.propTypes = {
    header: PropTypes.string.isRequired,
    handleCloseModal: PropTypes.func.isRequired
}

const Modal = ({ header,  children, onCloseClick}) => {

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleKeyDown = (event) => {
        if(event.key === "Escape") {
            onCloseClick();
        } 
    };

    return ReactDOM.createPortal(
        (
            <div>
                <ModalOverlay handleCloseModal={onCloseClick}/>
                <div className={styles.modal_body}>
                    <ModalHeader header={header} handleCloseModal={onCloseClick}/>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        ),
        modalRoot 
    )
}

Modal.propTypes = {
    header: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
    onCloseClick: PropTypes.func.isRequired
}

export default Modal;