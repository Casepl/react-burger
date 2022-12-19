import cx from 'classnames';
import { matchPath, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderBlock from '../header-block/header-block';
import style from './app-header.module.css';


const menu = [
  {
    Icon: BurgerIcon,
    title: 'Конструктор',
    to: '/',
    isActive: true
  },
  {
    Icon: ListIcon,
    to: '/feed',
    title: 'Лента заказов'
  }
];

function AppHeader() {
  const { pathname } =  useLocation();

  return (
    <header className={cx('pt-4 pb-4', style['header-root'])}>
      <div className={style['header-container']}>
        <div className={style['menu-container']}>
          {menu.map((item, index) => {
            return (
              <HeaderBlock key={index + item.title} {...item}
                           isActive={!!matchPath(pathname, item.to)}
                           isLast={index === menu.length - 1}/>
            );
          })}
        </div>
        <Link to='/'><Logo/></Link>
        <div className={style.login}>
          <HeaderBlock Icon={ProfileIcon} to='/profile' title="Личный кабинет"
                       isActive={!!matchPath({path: '/profile/*'}, pathname)}
                       isLast={true}/>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
