import styles from './modal-overlay.module.css';

interface IModalOverlay {
  onClose: () => void;
}
const ModalOverlay = (props: IModalOverlay) => {
  const { onClose } = props;

  return (
    <div className={styles['modal-overlay']} onClick={onClose}/>
  );
};

export default ModalOverlay;
