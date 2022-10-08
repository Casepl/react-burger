import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './ingridient-details.module.css';
import {ingredientType} from "../../constants/burgers-prop-type";


const CFPItem = (props) => {
    const {name, quantity} = props;

    return (
        <div>
            <p className="text text_type_main-default text_color_inactive">{name}</p>
            <p className={cx("text text_type_digits-default text_color_inactive", styles['center-text'])}>{quantity}</p>
        </div>
    );

}
const IngredientDetails = (props) => {
    const {ingredient: {image_large, name, proteins, fat, carbohydrates, calories} } = props;

    return (
        <div className='pb-5'>
            <div className={cx(styles.center, 'mb-4', styles['img-skeleton'])}>
                <img src={image_large} alt={name}/>
            </div>
            <div className='mb-8'>
                <p className={cx('text text_type_main-default', styles['center-text'])}>
                    {name}
                </p>
            </div>
            <div className={styles['cfp-container']}>
                <CFPItem name='Калории,ккал' quantity={calories}/>
                <CFPItem name='Белки, г' quantity={proteins}/>
                <CFPItem name='Жиры, г' quantity={fat}/>
                <CFPItem name='Углеводы, г' quantity={carbohydrates}/>
            </div>
        </div>
    );
}

IngredientDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
    ingredient: ingredientType.isRequired
}

export default IngredientDetails;
