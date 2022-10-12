import cx from 'classnames';
import CFPItem from '../cpf-item/cpf-item';
import { ingredientType } from '../../constants/burgers-prop-type';
import styles from './ingridient-details.module.css';

const IngredientDetails = (props) => {
  const {
    ingredient: {
      image_large,
      name,
      proteins,
      fat,
      carbohydrates,
      calories
    }
  } = props;

  return (
    <div className="pb-5">
      <div
        className={cx(styles.center, 'mb-4', styles['img-skeleton'])}>
        <img src={image_large} alt={name}/>
      </div>
      <div className="mb-8">
        <p
          className={cx('text text_type_main-default', styles['center-text'])}>
          {name}
        </p>
      </div>
      <div className={styles['cfp-container']}>
        <CFPItem name="Калории,ккал" quantity={calories}/>
        <CFPItem name="Белки, г" quantity={proteins}/>
        <CFPItem name="Жиры, г" quantity={fat}/>
        <CFPItem name="Углеводы, г" quantity={carbohydrates}/>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientType.isRequired
};

export default IngredientDetails;
