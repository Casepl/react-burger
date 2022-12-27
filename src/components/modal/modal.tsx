import ReactDOM from "react-dom";
import cx from 'classnames';
import { CloseIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css'
import {useEffect} from "react";


const modalRoot = document.getElementById("modal");

interface IModalHeaderProps {
    children: JSX.Element,
    onClose: () => void
}

const ModalHeader = (props: IModalHeaderProps) => {
    const { children, onClose } = props;

    return (
        <div className={styles['header-root']}>
           <div>
                {children}
           </div>
            <div>
                <Button data-test-id='modal-close-button'
                        extraClass={styles['reset-button-padding']}
                        type="secondary"
                        size="small"
                        htmlType='button'
                        onClick={onClose}>
                    <CloseIcon type='primary' />
                </Button>
            </div>
        </div>
    );
}




interface IModalProps {
    children: JSX.Element,
    header?: string,
    onClose: () => void
}

const Modal = (props: IModalProps) => {
    const { children, header, onClose } = props;



    useEffect(() => {
        const handleEscapePress = (e: KeyboardEvent) => {
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
                     <p className="text text_type_main-large">{header}</p>
                 </ModalHeader>
                 {children}
            </div>
        </>,
        modalRoot!
    );
}

export default Modal;
