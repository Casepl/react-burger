import React, { useMemo } from 'react';
import cx from 'classnames';
import {
  matchPath,
  useLocation,
  Link
} from 'react-router-dom';
import styles from './profile-menu.module.css';

const ProfileMenu = () => {
  const { pathname } = useLocation();

  const routes = useMemo(() => {

    return ([
      {
        name: 'Профиль',
        route: `/profile`
      },
      {
        name: 'Список заказов',
        route: `/profile/orders`
      },
      {
        name: 'Выход',
        route: `/profile/logout`
      }
    ]);

  }, []);


  return (
    <nav>
      {routes.map((r, i) => {
        return (
          <li key={i+r.route} className={styles['link-container']}>
            <Link
              className={
                cx('text text_type_main-medium',
                  styles.link,
                  !!matchPath({path: r.route}, pathname) ? 'text_color_primary' : 'text_color_inactive')}
              to={r.route}>{r.name}</Link>
          </li>
        );
      })}
    </nav>
  );
};

export default ProfileMenu;
