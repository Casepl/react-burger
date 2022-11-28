import { FC } from 'react'
import Modal from '../modal/modal';



interface IErrorModal {
  onClose: () => void;
  children?: JSX.Element | string;
}

const ErrorModal: FC<IErrorModal> = (props) => {
  const {onClose, children} = props;

  return (
    <Modal onClose={onClose} header='Не получены данные'>
      <p className="text text_type_main-medium">
        {children}
      </p>
    </Modal>
  )
}


export default ErrorModal;
