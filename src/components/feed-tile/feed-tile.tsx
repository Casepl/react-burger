import React, {useMemo} from 'react';
import {Link, useLocation} from 'react-router-dom';
import cx from 'classnames';
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "../../hooks/useSelector";
import styles from './feed-tile.module.css';
import {colorMap, textMap} from "../../constants/status-map";
import {TStatus} from "../../services/types/data";

interface IFeedTileProps {
    url: string
    status?: TStatus
    number: number,
    id: string,
    createdAt: string,
    name: string,
    ingredients: ReadonlyArray<string>
}

const MAX_INGREDIENTS = 6;
const FeedTile = (props: IFeedTileProps) => {
    const location = useLocation();
    const {number, createdAt, name, ingredients, id, status, url} = props;
    const {ingredients: ingredientsList} = useSelector((store) => store.ingredients);

    const orderInfo = useMemo(() => {
        if (!ingredients.length) return null;

        const ingredientsInfo = [];

        for (const ingredientId of ingredients) {
            const ingredient = ingredientsList.find((ingrain) => ingrain._id === ingredientId);
            ingredientsInfo.push(ingredient);
        }
        const total = ingredientsInfo.reduce((acc, ingredient) => {
            return acc + (ingredient?.price ?? 0)
        }, 0);

        const ingredientsToShow = ingredientsInfo.slice(0, MAX_INGREDIENTS);

        const remains = ingredientsInfo.length > MAX_INGREDIENTS ? ingredientsInfo.length - MAX_INGREDIENTS : 0;

        return {
            ingredientsToShow,
            remains,
            total
        }
    }, [ingredients, ingredientsList]);

    if (!orderInfo) {
        return null;
    }
    return (
        <Link className={styles.link} state={{ background: location }}
                to={{
                    pathname: url,
                }}>
            <div className={cx(styles.root, 'p-6')}>
                <div className={cx(styles.header, 'mb-6')}>
                    <p className="text text_type_digits-default">#{number}</p>
                    <FormattedDate className="text text_type_main-default text_color_inactive"
                                   date={new Date(createdAt)}/>
                </div>
                <p className={cx('text text_type_main-medium','mb-2')}>{name}</p>
                {status ? (
                <div className='mb-6'>
                    <p
                        className={cx('text text_type_main-default', `text_color_${colorMap[status]}`)}>
                        {textMap[status]}</p>
                </div>) : null}
                <div className={styles['order-info']}>
                    <div>
                        <div className={styles['ingriedient-wraper']}>
                            {orderInfo.ingredientsToShow.map((ingredient, index) => {
                                const zIndex = MAX_INGREDIENTS - index;

                                return (
                                    <div key={name + ingredient?._id + index + id} style={{zIndex: zIndex}}
                                         className={styles.ingriedient}>
                                        <div className={styles['ingriedient-image']}>
                                            <img src={ingredient?.image_mobile} alt={ingredient?.name} height={64}/>
                                        </div>
                                        {((MAX_INGREDIENTS - 1) === index && orderInfo?.remains) ? (
                                            <div className={styles['ingriedient-remain']}>
                                                <p className="text_type_main-default">+{orderInfo.remains}</p>
                                            </div>
                                        ) : null}
                                    </div>

                                );
                            })}
                        </div>
                    </div>
                    <div className={styles['total-wrapper']}>
                        <p className='text text_type_digits-default'>{orderInfo.total}</p>
                        <CurrencyIcon type='primary'/>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default FeedTile;
