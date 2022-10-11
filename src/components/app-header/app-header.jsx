import cx from 'classnames';
import PropTypes from 'prop-types';
import { Logo, BurgerIcon, ListIcon,  ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
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
]

function HeaderBlock(props) {
    const {Icon, title, isActive, isLast} = props;
    return (
        <nav className={cx(style['menu-item-container'], 'pl-5 pr-5 pt-4 pb-4', {'mr-2': !isLast })}>
            <div className='mr-2'>
                <Icon type={isActive ? 'primary' : 'secondary'} />
            </div>
            <div>
                <p className={cx("text text_type_main-default", isActive ? '' : 'text_color_inactive')}>{title}</p>
            </div>
        </nav>
    )
}

HeaderBlock.propTypes = {
    Icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    isLast: PropTypes.bool,
}

function AppHeader() {
    return (
        <header className={cx('pt-4 pb-4', style['header-root'])}>
            <div className={style['header-container']}>
                <div className={style['menu-container']}>
                    {menu.map((item, index) => {
                        return (
                            <HeaderBlock key={index+item.title} {...item} isLast={index === menu.length - 1}/>
                        );
                    })}
                </div>
                <Logo />
                <div className={style.login}>
                    <HeaderBlock Icon={ProfileIcon} title='Личный кабинет' isLast={true}/>
                </div>
            </div>
        </header>
    );
}


export default AppHeader;
