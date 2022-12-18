import React, {useMemo} from 'react';
import cx from "classnames";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams} from "react-router-dom";
import {IIngredientProps} from "../../constants/burgers-prop-type";
import {useSelector} from "../../hooks/useSelector";
import {colorMap, textMap} from "../../constants/status-map";
import styles from "../order-by-id/order-by-id.module.css";
import Loader from "../loader/loader";



const ProfileOrder = () => {
    const { id } = useParams();
    const { orders } = useSelector((store) => store.profileOrders);

    const { ingredients }: { ingredients: IIngredientProps[]} =
        useSelector((store) => store.ingredients);

    const order = useMemo(() => {
        const foundOrder = orders.find((order) => order._id === id);

        const ingredientsDetails = [];

        const map = new Map();

        for(const ingr of foundOrder?.ingredients ?? []) {
            const ingredientInfo = ingredients.find(ingredient => ingredient._id ===ingr);

            const id = ingredientInfo?._id;
            if(map.has(id)){
                map.set(id, map.get(id) + 1);
            } else {
                ingredientsDetails.push(ingredientInfo);
                map.set(id, 1);
            }
        }

        const ingredientToShow = [];

        for(const ingredient of ingredientsDetails) {
            ingredientToShow.push({count: map.get(ingredient?._id),
            info: {...ingredient}});
        }

        const total = ingredientToShow.reduce((acc, ingredient) =>{
            return acc + (ingredient?.info?.price ?? 0);
        }, 0);

        return {
            info: foundOrder,
            ingredientToShow,
            total: total
        };
    }, [orders, id, ingredients]);

    if(!orders.length || !ingredients.length) {
        return (<Loader />)
    }
    return (
        <div>
            <div className={cx(styles.head, 'mb-10')}>
                <div>
                    <p className='text text_type_digits-default'>#{order?.info?.number}</p>
                </div>
            </div>
            <div className='mb-3'>
                <p className='text text_type_main-medium'>{order?.info?.name}</p>
            </div>
            <div className='mb-15'>
                <p
                    className={cx('text text_type_main-default', `text_color_${colorMap[order.info?.status!]}`)}>
                    {textMap[order.info?.status!]}</p>
            </div>
            <div className='mb-6'>
                <p className='text text_type_main-default'>Состав:</p>
            </div>
            <div className={cx(styles.list, 'custom-scroll', 'mb-10')}>
                {order.ingredientToShow.map((ingredient) =>{
                    return (
                        <div className={cx(styles['ingredient-el'], 'pr-6')}>
                            <div className={cx(styles.img, 'mr-4')}>
                                <img alt={ingredient.info.name} height={64} src={ingredient.info.image_mobile} />
                            </div>
                            <div className={cx(styles['ingredient-name'], 'mr-4')}>
                                <p className='text text_type_main-default'>{ingredient.info.name}</p>
                            </div>
                            <div className='mr-1'>
                                <p className='text text_type_digits-default'>{ingredient.count}{' '}x{' '}{ingredient.info.price}</p>
                            </div>
                            <CurrencyIcon type='primary' />
                        </div>
                    )
                })}
            </div>
            <div className={styles['total']}>
                <FormattedDate className="text text_type_main-default text_color_inactive"
                               date={order.info?.createdAt ? new Date(order.info?.createdAt) : new Date()}/>
               <div className={styles['total-currency']}>
                   <div className='mr-1'>
                       <p className='text text_type_digits-default'>{order.total}</p>
                   </div>
                   <CurrencyIcon type='primary' />
               </div>
            </div>
        </div>
    );
};

export default ProfileOrder;
