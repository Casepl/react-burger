import React, { SyntheticEvent } from 'react';
import cx from 'classnames';
import { Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { registration } from '../services/actions/registration';
import {
  Input, EmailInput, PasswordInput, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './registration.module.css';


interface IFormRegistration {
  name: string,
  email: string,
  password: string
}

const Registration = () => {
  const {
    user,
    errorMessage,
    registrationRequest
  } = useSelector((store: any) => {
    return {
      ...store.registration,
      user: store.auth.user
    }
  });
  const dispatch = useDispatch();

  const [form, handleChange] = useForm<IFormRegistration>({
    name: '',
    email: '',
    password: ''
  });

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // @ts-ignore
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
          onChange={handleChange} value={form.name} placeholder={'Имя'}
          name={'name'}/>
        <EmailInput
          extraClass={'mb-6'}
          onChange={handleChange} value={form.email} name={'email'}/>
        <PasswordInput
          extraClass={'mb-6'}
          onChange={handleChange} value={form.password}
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
          <Link className={
            cx('text text_type_main-default text_color_accent',
              styles.link)}
             to='/login'>Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
