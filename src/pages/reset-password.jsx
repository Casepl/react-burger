import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../services/actions/reset-password';
import cx from 'classnames';
import {
  Input, PasswordInput, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookie';


const ResetPassword = () => {
  const [form, setForm] = useState({
    token: '',
    password: ''
  });

  const dispatch = useDispatch();
  const isPasswordReset = getCookie('isPasswordReset');

  const {
    resetPasswordRequest,
    errorMessage,
    message
  } = useSelector((store) => {
    return {
      resetPasswordRequest: store.resetPassword.resetPasswordRequest,
      errorMessage: store.resetPassword.errorMessage,
      message: store.resetPassword.message
    };
  });

  const { user } = useSelector((store) => store.auth);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(form));
  };

  if (user) {
    return (
      <Navigate to='/' replace/>
    );
  }


  if(!isPasswordReset) {
    return (
      <Navigate to='/forgot-password' replace />
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
        <PasswordInput
          extraClass={'mb-6'}
          placeholder={'Введите новый пароль'}
          onChange={onChange} value={form.password}
          name={'password'}/>
        <Input
          extraClass={'mb-6'}
          placeholder={'Введите код из письма'}
          onChange={onChange} value={form.token} name={'token'}/>
        <div className={styles['button-wrapper']}>
          <Button
            htmlType="submit"
            disabled={resetPasswordRequest || (!form.code
              && !form.password)}
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

export default ResetPassword;
