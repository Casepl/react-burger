import React from 'react';
import {
  Route,
  Routes, useLocation, useNavigate
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppHeader from '../app-header/app-header';
import Loader from '../loader/loader';
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage, Logout, NotFound404, ProfilePage,
  RegistrationPage, ResetPasswordPage
} from '../../pages';
import IngredientDetails
  from '../ingredient-details/ingridient-details';
import { ProtectedRoute } from '../protected-route/protected-route';
import ProfileForm from '../profile-form/profile-form';
import Modal from '../modal/modal';


const ModalRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleRouteModalClose = () => {
    navigate(-1);
  };

  const userRequest = useSelector((store) => store.user.userRequest);
  const { ingredientsRequest } =
    useSelector((store) => store.ingredients);

  return (
    <>
      <AppHeader/>
      {userRequest || ingredientsRequest ? (<Loader/>) :
        (<Routes location={background || location}>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/registration"
                 element={<RegistrationPage/>}/>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path="/forgot-password" exact
                 element={<ForgotPasswordPage/>}/>
          <Route path="/reset-password" exact
                 element={<ResetPasswordPage/>}/>
          <Route path='/ingredients/:ingredientId' exact element={<IngredientDetails />} />
          <Route path="/profile"
                 element={
                   (<ProtectedRoute>
                     <ProfilePage/>
                   </ProtectedRoute>)}>
            <Route path="/profile" exact element={
              <ProfileForm/>
            }/>
            <Route path="/profile/logout" exact element={
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
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default ModalRoutes;
