import ReactDOM from "react-dom";
import cx from 'classnames';
import { CloseIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css'
import {useEffect} from "react";


const modalRoot = document.getElementById("modal");

const ModalHeader = (props) => {
    const { children, onClose } = props;

    return (
        <div className={styles['header-root']}>
            <div>
                {children}
            </div>
            <div>
                <Button extraClass={styles['reset-button-padding']} type="secondary" size="small" htmlType='button' onClick={onClose}>
                    <CloseIcon type='primary' />
                </Button>
            </div>
        </div>
    );
}

ModalHeader.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired
}

const Modal = (props) => {
    const { children, header, onClose } = props;



    useEffect(() => {
        const handleEscapePress = (e) => {
            if(e.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleEscapePress);
        return () => window.removeEventListener('keydown', handleEscapePress)
    },[onClose]);

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={cx(styles['modal-content'], 'p-10')}>
                 <ModalHeader onClose={onClose}>
                     <p className="text text_type_main-medium">{header}</p>
                 </ModalHeader>
                 {children}
            </div>
        </>,
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired
};

export default Modal;
