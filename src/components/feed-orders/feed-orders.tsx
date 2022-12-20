import cx from 'classnames';
import styles from './feed-orders.module.css';

import FeedTile from "../feed-tile/feed-tile";
import {IOrder} from "../../services/types/data";

interface IFeedOrdersProps {
    orders: ReadonlyArray<IOrder>
}

const FeedOrders = ({ orders }: IFeedOrdersProps) => {
    return (
            <div className={cx(styles.list, 'custom-scroll', 'pr-2')}>
                {orders.map((order, index) => {
                    return (<FeedTile
                        url={`/feed/${order._id}`}
                        key={order._id + order.createdAt + index}
                        number={order.number}
                        createdAt={order.createdAt}
                        name={order.name}
                        id={order._id}
                        ingredients={order.ingredients} />);
                })}
            </div>
    );
};

export default FeedOrders;
