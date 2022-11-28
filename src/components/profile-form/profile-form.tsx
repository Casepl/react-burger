import React, {ChangeEvent, SyntheticEvent, useRef, useState} from 'react';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  EmailInput,
  Input, PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form.module.css';
import { patchUser } from '../../services/actions/user';

const ProfileForm = () => {
  const { user } = useSelector((store: any) => {
    return store.auth;
  });

  const { errorUserPatchMessage, userPatchRequest } = useSelector((store: any) => {
    return store.user;
  })

  const [form, setForm] = useState(user ? {...user, password: ''}
    : {email: '', name: '', password: ''} );

  const dispatch = useDispatch();

  const [fieldDisabled, setDisabled] = useState(true);

  const nameRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setDisabled(false);
    setTimeout(() => nameRef.current?.focus(), 0);
  };

  const onBlur = () => {
    setDisabled(true);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(patchUser(form));
  };

  const handleReset = () => {
    setForm( {...user, password: ''});
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <Input
            ref={nameRef}
            value={form.name}
            onChange={onChange}
            onBlur={onBlur}
            name={'name'}
            placeholder="Имя"
            disabled={fieldDisabled}
            onIconClick={onIconClick}
            icon="EditIcon"/>
        </div>
        <div className="mb-6">
          <EmailInput
            onChange={onChange}
            value={form.email}
            name={'email'}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-2"
          />
        </div>
        <div>
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={'password'}
            icon="EditIcon"
          />
        </div>
        <div className={cx('pt-6', styles['button-wrapper'])}>
          <Button htmlType="button" type="secondary" onClick={handleReset}>Отмена</Button>
          <Button htmlType="submit" disabled={userPatchRequest}>Сохранить</Button>
        </div>
        {errorUserPatchMessage && (<p
          className='text text_type_main-small text_color_error'>
          {errorUserPatchMessage}
        </p>)}
      </form>
    </div>
  );
};

export default ProfileForm;
