import cx from 'classnames';
import styles
  from '../ingredient-details/ingridient-details.module.css';
import PropTypes from 'prop-types';

const CFPItem = (props) => {
  const {name, quantity} = props;

  return (
    <div>
      <p className="text text_type_main-default text_color_inactive">{name}</p>
      <p className={cx(
        "text text_type_digits-default text_color_inactive",
        styles['center-text'])}
      >
        {quantity}
      </p>
    </div>
  );

}

CFPItem.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
}


export default CFPItem;
