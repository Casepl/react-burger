import { useState, useMemo } from 'react';
import cx from 'classnames';
import { Tab,  CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import burgersPropType  from '../../constants/BurgersPropType';
import styles from './index.module.css';
import PropTypes from 'prop-types';

const Tabs = () => {
    const [current, setCurrent] = useState('bun');

    return (
        <div style={{ display: 'flex' }}>
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
    const { name, image, price } = props;

    return (
        <div className={styles['tile-container']}>
            <div className='mb-2 pl-4 pr-4'>
                <img src={image} alt={name} />
            </div>
            <div className={cx(styles['price-container'], 'mb-2')}>
                <div className='mr-2'>
                    <p className='text text_type_digits-default'>{price}</p>
                </div>
                <CurrencyIcon type='primary' />
            </div>
            <div>
                <p className={cx('text text_type_main-default', styles['text-center'])}>{name}</p>
            </div>
            <Counter count={1} size='default' />
        </div>
    )
}


Tile.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

const Group = (props) => {
    const { title, list } = props;

    return (
      <div>
          <div>
              <p className='text text_type_main-medium'>{title}</p>
          </div>
          <div className={cx(styles['tile-list-container'], 'pt-6', 'pl-4', 'pb-10')}>
              {list.map((item) => {
                  return (
                      <Tile key={item._id} {...item} />
                  );
              })}
          </div>
      </div>
    );
}

Group.propTypes = {
    title: PropTypes.string.isRequired,
    list: burgersPropType.isRequired
}

const filterTypes = (type) => (item) => {
     return item.type === type;
}

const BurgerIngredients = (props) => {
    const { data } = props;

    const groups = useMemo(() => {
        const buns = data.filter(filterTypes('bun'));
        const sause = data.filter(filterTypes('sauce'));
        const main = data.filter(filterTypes('main'));

        return [{title: 'Булки', list: buns}, { title: 'Cоусы', list: sause}, { title: 'Начинки', list: main }]
    }, [data]);

    return (
        <div className='pt-10'>
            <div className='mb-5'>
                <p className='text text_type_main-large'>Собери бургер</p>
            </div>
            <div className='mb-10'>
                <Tabs />
            </div>
            <div className={styles.list}>
                {groups.map((group,index) => {
                    return <Group key={index+group.title} {...group} />
                })}
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: burgersPropType
}

export default BurgerIngredients;
