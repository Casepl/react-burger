import React from 'react';
import {
  Outlet
} from 'react-router-dom';
import cx from 'classnames';
import ProfileMenu from '../components/profile-menu/profile-menu';
import styles from './profile.module.css';



const Profile = () => {
  return (
    <div className={cx(styles.root, 'pt-30')}>
      <div className={styles.container}>
        <ProfileMenu />
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
