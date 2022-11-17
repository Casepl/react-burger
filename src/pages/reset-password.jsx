import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookie';
import { resetPassword } from '../services/actions/reset-password';
import cx from 'classnames';
import {
  Input, PasswordInput, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import { useForm } from '../hooks/useForm';


const ResetPassword = () => {
  const [form, handleChange] = useForm({
    token: '',
    password: ''
  });

  const dispatch = useDispatch();
  const isPasswordReset = getCookie('isPasswordReset');

  const {
    resetPasswordRequest,
    errorMessage,
    message,
    isPasswordResetSuccess
  } = useSelector((store) => {
    return {
      resetPasswordRequest: store.resetPassword.resetPasswordRequest,
      errorMessage: store.resetPassword.errorMessage,
      message: store.resetPassword.message,
      isPasswordResetSuccess: store.resetPassword.isPasswordResetSuccess
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(form));
  };


  if(isPasswordResetSuccess) {
    return <Navigate to='/login' replace />
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
          onChange={handleChange} value={form.password}
          name={'password'}/>
        <Input
          extraClass={'mb-6'}
          placeholder={'Введите код из письма'}
          onChange={handleChange} value={form.token} name={'token'}/>
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
          <Link className={
            cx('text text_type_main-default text_color_accent',
              styles.link)}
             to='/login'>Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
