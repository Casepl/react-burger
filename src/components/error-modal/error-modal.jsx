import Modal from '../modal/modal';
import PropTypes from 'prop-types';

const ErrorModal = (props) => {
  const {onClose, children} = props;

  return (
    <Modal onClose={onClose} header='Не получены данные'>
      <p className="text text_type_main-medium">
        {children}
      </p>
    </Modal>
  )
}

ErrorModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element
}

export default ErrorModal;
