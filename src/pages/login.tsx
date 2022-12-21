import React, { SyntheticEvent }from 'react';
import cx from 'classnames';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from '../hooks/useDispatch';
import { useSelector } from '../hooks/useSelector';
import { login } from '../services/actions/login';
import { useForm } from '../hooks/useForm';
import {
  EmailInput, PasswordInput, Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';


interface IForm {
  email: string;
  password: string;
}
const Login = () => {
  const {
    user,
    errorMessage,
    loginRequest
  } = useSelector((store: any) => {
    return {
      ...store.login,
      user: store.auth.user
    };
  });

  const { state } = useLocation();
  const dispatch = useDispatch();

  const [form, handleChange] = useForm<IForm>({
    email: '',
    password: ''
  });

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(login(form));
  };

  if (user) {
    return (
      <Navigate
        to={state?.redirectTo && state?.redirectTo !== '/profile/logout' ? state.redirectTo : '/'}
        replace/>
    );
  }

  return (
    <div className={styles.root}>
      <form onSubmit={onSubmit} className={'mb-20'}>
        <legend
          className={cx('text text_type_main-medium',
            styles['title-center'], 'mb-6')}>
          Вход
        </legend>
        <EmailInput
          extraClass={'mb-6'}
          onChange={handleChange} value={form.email} name={'email'}/>
        <PasswordInput
          extraClass={'mb-6'}
          onChange={handleChange} value={form.password}
          name={'password'}/>
        <div className={styles['button-wrapper']}>
          <Button data-test-id="login-button" htmlType="submit"
                  disabled={loginRequest || (!form.email && !form.password)}>Войти</Button>
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
          Вы - новый пользователь? {' '}
          <Link className={
            cx('text text_type_main-default text_color_accent',
              styles.link)}
                to="/registration">Зарегистрироваться</Link>
        </p>
        <p
          className={
            cx('text text_type_main-default text_color_inactive',
              styles['text-center'])
          }>
          Забыли
          пароль? {' '}
          <Link className={
            cx('text text_type_main-default text_color_accent',
              styles.link)}
                to='/forgot-password'>Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
