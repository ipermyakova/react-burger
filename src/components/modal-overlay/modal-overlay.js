import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.overlay.module.css';

const ModalOverlay = ( { handleCloseModal }) => {
    return (
        <div className={styles.modal_overlay} onClick={handleCloseModal}/>
    )
}

ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func.isRequired
}

export default ModalOverlay;