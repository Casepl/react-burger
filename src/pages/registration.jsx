import React, { useState } from 'react';
import cx from 'classnames';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../services/actions/registration';
import {
  Input, EmailInput, PasswordInput, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './registration.module.css';

const Registration = () => {
  const {
    user,
    errorMessage,
    registrationRequest
  } = useSelector((store) => {
    return {
      ...store.registration,
      user: store.auth.user
    }
  });
  const dispatch = useDispatch();

  const [form, setValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChange = e => {
    setValue({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registration(form));
  };

  if (user) {
    return (
      <Navigate to='/' replace />
    );
  }

  return (
    <div className={styles.root}>

      <form onSubmit={onSubmit} className={'mb-20'}>
        <legend
          className={cx('text text_type_main-medium',
            styles['title-center'], 'mb-6')}>
          Регистрация
        </legend>
        <Input
          extraClass={'mb-6'}
          onChange={onChange} value={form.name} placeholder={'Имя'}
          name={'name'}/>
        <EmailInput
          extraClass={'mb-6'}
          onChange={onChange} value={form.email} name={'email'}/>
        <PasswordInput
          extraClass={'mb-6'}
          onChange={onChange} value={form.password}
          name={'password'}/>
        <div className={styles['button-wrapper']}>
          <Button
            htmlType="submit"
            disabled={registrationRequest ||
              (!form.name && !form.email && !form.password)}>
            Зарегистрироваться</Button>
        </div>
        {errorMessage &&
          (<p
            className={cx(
              'pt-6 text text_type_main-default text_color_error',
              styles['text-center'])}
          >{errorMessage}
          </p>)}
      </form>
      <div className={styles['link-wrapper']}>
        <p
          className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы? {' '}
          <a className={
            cx('text text_type_main-default text_color_accent',
              styles.link)}
             href="/login">Войти</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
