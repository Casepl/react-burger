import {useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = (props) => {
    const { onClose } = props;

    useEffect(() => {

        const close = (e) => {
            if(e.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close)
    },[onClose])

    return (
        <div className={styles['modal-overlay']} onClick={onClose} />
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;
