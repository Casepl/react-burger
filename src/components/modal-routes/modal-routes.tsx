import React from 'react';
import {
    Route,
    Routes, useLocation, useNavigate
} from 'react-router-dom';
import {useSelector} from 'react-redux';
import AppHeader from '../app-header/app-header';
import Loader from '../loader/loader';
import {
    ForgotPasswordPage,
    HomePage,
    LoginPage, Logout, NotFound404, ProfilePage,
    RegistrationPage, ResetPasswordPage, Feed, ProfileOrders, FeedOrder
} from '../../pages';
import IngredientDetails
    from '../ingredient-details/ingridient-details';
import {ProtectedRoute} from '../protected-route/protected-route';
import ProfileForm from '../profile-form/profile-form'
import Modal from '../modal/modal';
import OrderById from "../order-by-id/order-by-id";
import ProfileOrder from "../profile-order/profile-order";
import ProfileOrderPage from "../../pages/profile-order";


const ModalRoutes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const handleRouteModalClose = () => {
        navigate(-1);
    };

    const userRequest = useSelector((store: any) => store.user.userRequest);
    const {ingredientsRequest} =
        useSelector((store: any) => store.ingredients);

    return (
        <>
            <AppHeader/>
            {userRequest || ingredientsRequest ? (<Loader/>) :
                (<Routes location={background || location}>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/registration"
                           element={<RegistrationPage/>}/>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                    <Route path='/ingredients/:ingredientId' element={<IngredientDetails/>}/>
                    <Route path='/profile/orders/:id' element={
                        <ProtectedRoute>
                            <ProfileOrderPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path='/feed/:id' element={<FeedOrder/>}/>
                    <Route path='/feed' element={<Feed/>}/>
                    <Route path="/profile"
                           element={
                               (<ProtectedRoute>
                                   <ProfilePage/>
                               </ProtectedRoute>)}>
                        <Route path="/profile" element={
                            <ProfileForm/>
                        }/>
                        <Route path="/profile/orders" element={
                            <ProfileOrders/>
                        }/>
                        <Route path="/profile/logout" element={
                            <Logout/>
                        }/>
                    </Route>
                    <Route path="*" element={<NotFound404/>}/>
                </Routes>)}
            {background && (
                <Routes>
                    <Route
                        path='/ingredients/:ingredientId'
                        element={
                            <Modal header='Детали ингредиента' onClose={handleRouteModalClose}>
                                <IngredientDetails/>
                            </Modal>
                        }
                    />
                    <Route
                        path='/feed/:id'
                        element={
                            <Modal onClose={handleRouteModalClose}>
                                <OrderById/>
                            </Modal>
                        }
                    />
                    <Route
                        path='/profile/orders/:id'
                        element={
                            (<ProtectedRoute>
                                <Modal onClose={handleRouteModalClose}>
                                    <ProfileOrder/>
                                </Modal>
                            </ProtectedRoute>)
                        }
                    />
                </Routes>
            )}
        </>
    );
};

export default ModalRoutes;
