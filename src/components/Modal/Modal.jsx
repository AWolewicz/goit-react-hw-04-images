import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css'

export const Modal = ({ onClick, openModal }) => {

    //Close modal on Escape
    useEffect(() => {
    const handleKeyDown = e => {
        if (e.keyCode === 27) {
            onClick();
        }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
    }, [onClick]);
    

    //Close modal if clicked out of the image
    const handleCloseModal = e => {
        if (e.target === e.currentTarget) {
            onClick();
        }
    };

    return (
        <div className={css.overlay} onClick={handleCloseModal}>
            <div className={css.modal}>
                <img src={openModal} alt="" width="800" height="600"/>
                </div>
        </div>
    )
};

Modal.propTypes = {
    onClick: PropTypes.func,
    openModal: PropTypes.string,
}