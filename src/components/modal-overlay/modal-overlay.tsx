import React, { FC } from 'react';
import styles from './modal.overlay.module.css';

type TModalOverlayProps = {
    readonly handleCloseModal: () => void;
}

const ModalOverlay: FC<TModalOverlayProps> = ( { handleCloseModal }) => {
    return (
        <div className={styles.modal_overlay} onClick={handleCloseModal}/>
    )
}

export default ModalOverlay;