import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = (props) => {
    const { onClose } = props;

    return (
        <div className={styles['modal-overlay']} onClick={onClose} />
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;
