import React, { useEffect, FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';


type TModalHeaderProps = {
    readonly header: string;
    readonly handleCloseModal: () => void;
}

const ModalHeader: FC<TModalHeaderProps> = ({ header, handleCloseModal }) => {
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

type TModalProps = {
    readonly header: string;
    readonly children?: ReactNode;
    readonly onCloseClick: () => void; 
}

const Modal: FC<TModalProps> = ({ header,  children, onCloseClick}) => {
    const modalRoot = document.getElementById('modal-root');

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement> | KeyboardEvent): void => {
        if(event.key === "Escape") {
            onCloseClick();
        } 
    };

    return modalRoot ? ReactDOM.createPortal(
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
    ) : null;
}

export default Modal;