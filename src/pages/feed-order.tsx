import React, { useEffect } from 'react';
import {WS_FEED_CLOSE_SOCKET, WS_FEED_CONNECTION_START} from '../services/actions/feed';
import OrderById from "../components/order-by-id/order-by-id";
import {useDispatch} from "../hooks/useDispatch";
import {useSelector} from "../hooks/useSelector";
import { FEED_SOCKET_URL } from "../constants/url-list";
import Loader from "../components/loader/loader";
import styles from './feed-order.module.css';


const FeedOrderPage = () => {
    const dispatch = useDispatch();
    const { wsConnected  } = useSelector((store) => store.feed);

    useEffect(() => {
            dispatch({ type: WS_FEED_CONNECTION_START, payload: FEED_SOCKET_URL });
            return () => {
                dispatch({ type: WS_FEED_CLOSE_SOCKET});
            }
        },
        [dispatch]
    );

    if(!wsConnected) {
        return (<Loader />)
    }

    return (
        <main className={styles['root']}>
            <div className={styles['wrapper']}>
                <OrderById />
            </div>
        </main>
    );
}

export default FeedOrderPage;
