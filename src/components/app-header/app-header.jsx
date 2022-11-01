import cx from 'classnames';
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
    isActive: true
  },
  {
    Icon: ListIcon,
    title: 'Лента заказов'
  }
];

function AppHeader() {
  return (
    <header className={cx('pt-4 pb-4', style['header-root'])}>
      <div className={style['header-container']}>
        <div className={style['menu-container']}>
          {menu.map((item, index) => {
            return (
              <HeaderBlock key={index + item.title} {...item}
                           isLast={index === menu.length - 1}/>
            );
          })}
        </div>
        <Logo/>
        <div className={style.login}>
          <HeaderBlock Icon={ProfileIcon} title="Личный кабинет"
                       isLast={true}/>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
