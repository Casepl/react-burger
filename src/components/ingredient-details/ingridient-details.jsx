import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import CFPItem from '../cpf-item/cpf-item';
import styles from './ingridient-details.module.css';
import { getIngredients } from '../../services/actions/ingridients';
import Loader from '../loader/loader';

const IngredientDetails = () => {
  const { ingredientId } = useParams();
  const dispatch = useDispatch();

  const { ingredientsRequest, ingredients } =
    useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch, ingredientId]);

  const { name, image_large, calories, proteins, fat,carbohydrates} =
    useMemo(() => {
      return ingredients?.find((item) => item._id === ingredientId) ?? {};
    }, [ingredientId, ingredients])

  if(ingredientsRequest) {
    return <Loader />
  }


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
