import {useState, useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import {ingredientsArrayType, ingredientType} from '../../constants/burgers-prop-type';
import styles from './burger-ingredients.module.css';
import IngredientDetails from "../ingredient-details/ingridient-details";


const Tabs = () => {
    const [current, setCurrent] = useState('bun');

    return (
        <div className={styles.tabs}>
            <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
                Булка
            </Tab>
            <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
                Соус
            </Tab>
            <Tab value='main' active={current === 'main'} onClick={setCurrent}>
                Начинка
            </Tab>
        </div>
    )
}

const Tile = (props) => {
    const {item: {name, image, price}, onTileClick} = props;

    return (
        <div className={styles['tile-container']} onClick={onTileClick}>
            <div className='mb-2 pl-4 pr-4'>
                <img src={image} alt={name}/>
            </div>
            <div className={cx(styles['price-container'], 'mb-2')}>
                <div className='mr-2'>
                    <p className='text text_type_digits-default'>{price}</p>
                </div>
                <CurrencyIcon type='primary'/>
            </div>
            <div>
                <p className={cx('text text_type_main-default', styles['text-center'])}>{name}</p>
            </div>
            <Counter count={1} size='default'/>
        </div>
    )
}


Tile.propTypes = {
    item: ingredientType.isRequired,
    onTileClick: PropTypes.func
}

const Group = (props) => {
    const {title, list, onTileClick} = props;

    return (
        <div>
            <div>
                <p className='text text_type_main-medium'>{title}</p>
            </div>
            <div className={cx(styles['tile-list-container'], 'pt-6', 'pl-4', 'pb-10')}>
                {list.map((item) => {
                    return (
                        <Tile key={item._id} item={item} onTileClick={() => {
                            onTileClick(item);
                        }}/>
                    );
                })}
            </div>
        </div>
    );
}

Group.propTypes = {
    title: PropTypes.string.isRequired,
    list: ingredientsArrayType.isRequired,
    onTileClick: PropTypes.func.isRequired
}

const filterTypes = (type) => (item) => {
    return item.type === type;
}

const BurgerIngredients = (props) => {
    const {data} = props;
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    const groups = useMemo(() => {
        const buns = data.filter(filterTypes('bun'));
        const sause = data.filter(filterTypes('sauce'));
        const main = data.filter(filterTypes('main'));

        return [{title: 'Булки', list: buns}, {title: 'Cоусы', list: sause}, {title: 'Начинки', list: main}]
    }, [data]);

    const handleTileClick = useCallback((ingredient) => {
        setSelectedIngredient(ingredient);
    }, []);

    const handleDetailsClose = useCallback(() => {
        setSelectedIngredient(null);
    }, []);

    return (
        <div className='pt-10'>
            <div className='mb-5'>
                <p className='text text_type_main-large'>Собери бургер</p>
            </div>
            <div className='mb-10'>
                <Tabs/>
            </div>
            <div className={styles.list}>
                {groups.map((group, index) => {
                    return <Group key={index + group.title} {...group} onTileClick={handleTileClick}/>
                })}
            </div>
            {selectedIngredient && (
                <Modal header='Детали ингредиента' onClose={handleDetailsClose}>
                    <IngredientDetails ingredient={selectedIngredient} />
                </Modal>)
            }
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: ingredientsArrayType.isRequired
}

export default BurgerIngredients;
