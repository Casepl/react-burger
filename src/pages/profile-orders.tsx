import React, { useEffect } from 'react';
import {WS_ORDERS_CONNECTION_START, WS_ORDERS_CLOSE_SOCKET} from '../services/actions/orders';
import ProfileOrders from "../components/profile-orders/profile-orders";
import {useDispatch} from "../hooks/useDispatch";
import {useSelector} from "../hooks/useSelector";
import {ORDERS_SOCKET_URL} from "../constants/url-list";
import Loader from "../components/loader/loader";
import {getCookie} from "../utils/cookie";


const ProfileOrdersPage = () => {
    const dispatch = useDispatch();
    const { wsConnected, orders } = useSelector((store) => store.profileOrders);

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
        <>
          <ProfileOrders orders={orders} />
        </>
    );
}

export default ProfileOrdersPage;
