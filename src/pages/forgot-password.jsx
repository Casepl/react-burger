import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../services/actions/forgot-password';
import cx from 'classnames';
import {
  Button, EmailInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';
import { Navigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const {
    user
  } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const {
    forgotPasswordRequest,
    errorMessage,
    message
  } = useSelector((store) => {
    return {
      resetPasswordRequest: store.forgotPassword.forgotPasswordRequest,
      errorMessage: store.forgotPassword.errorMessage,
      message: store.forgotPassword.message
    };
  });

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  if (user) {
    return (
      <Navigate to="/" replace/>
    );
  }



  return (
    <div className={styles.root}>
      <form onSubmit={onSubmit} className={'mb-20'}>
        <legend
          className={cx('text text_type_main-medium',
            styles['title-center'], 'mb-6')}>
          Восстановление пароля
        </legend>
        <EmailInput
          extraClass={'mb-6'}
          onChange={onChange} value={email} name={'email'}/>
        <div className={styles['button-wrapper']}>
          <Button
            htmlType="submit"
            disabled={forgotPasswordRequest || !email}
          >Сохранить</Button>
        </div>
        {message &&
          (<p
            className={
              cx('text text_type_main-default text_color_success',
                styles['text-center'])}
          >{message}</p>)}
        {errorMessage &&
          (<p
            className={
              cx('text text_type_main-default text_color_error',
                styles['text-center'])}
          >{errorMessage}</p>)}
      </form>
      <div className={styles['link-wrapper']}>
        <p
          className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? {' '}
          <a className={
            cx('text text_type_main-default text_color_accent',
              styles.link)}
             href="/login">Войти</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
