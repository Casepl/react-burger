import cx from 'classnames';
import styles
  from '../ingredient-details/ingridient-details.module.css';


interface ICFPItem {
    name: string,
    quantity: number
}
const CFPItem = (props: ICFPItem) => {
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

export default CFPItem;
