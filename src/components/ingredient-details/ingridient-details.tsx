import cx from 'classnames';
import { useSelector } from '../../hooks/useSelector';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import CFPItem from '../cpf-item/cpf-item';
import styles from './ingridient-details.module.css';
import {IIngredientProps} from "../../constants/burgers-prop-type";

const IngredientDetails = () => {
  const { ingredientId } = useParams();

  const { ingredients }: { ingredients: IIngredientProps[]} =
    useSelector((store) => store.ingredients);

  const { name, image_large, calories, proteins, fat, carbohydrates} =
    useMemo(() => {
      return ingredients?.find((item) => item._id === ingredientId) ?? {
          name: '', image_large: '', calories: 0, proteins: 0, fat: 0,carbohydrates: 0
      };
    }, [ingredientId, ingredients])

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
        <CFPItem name="Калории,ккал" quantity={calories || 0}/>
        <CFPItem name="Белки, г" quantity={proteins || 0}/>
        <CFPItem name="Жиры, г" quantity={fat || 0}/>
        <CFPItem name="Углеводы, г" quantity={carbohydrates || 0}/>
      </div>
    </div>
  );
};

export default IngredientDetails;
