import React, { useEffect } from 'react';
import {WS_ORDERS_CLOSE_SOCKET, WS_ORDERS_CONNECTION_START} from '../services/actions/orders';
import {getCookie} from '../utils/cookie';
import {useDispatch} from '../hooks/useDispatch';
import {useSelector} from '../hooks/useSelector';
import {ORDERS_SOCKET_URL} from '../constants/url-list';
import Loader from '../components/loader/loader';
import ProfileOrder from '../components/profile-order/profile-order';
import styles from './feed-order.module.css';



const ProfileOrderPage = () => {
    const dispatch = useDispatch();

    const { wsConnected } = useSelector((store) => store.profileOrders);

    useEffect(() => {
            const accessToken = getCookie('accessToken')?.replace(/Bearer\s/, '');

            dispatch({ type: WS_ORDERS_CONNECTION_START, payload: `${ORDERS_SOCKET_URL}?token=${accessToken}` });

            return () => {
                dispatch({ type: WS_ORDERS_CLOSE_SOCKET});
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
                <ProfileOrder />
            </div>
        </main>
    );
}

export default ProfileOrderPage;
