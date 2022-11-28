import cx from 'classnames';
import { Link } from 'react-router-dom';
import styles from './header-block.module.css';

import type { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";


interface IHeaderBlockProps {
  Icon: ({ type }: TIconProps) => JSX.Element;
  title: string;
  to: string;
  isActive: boolean;
  isLast: boolean;
};

function HeaderBlock(props: IHeaderBlockProps) {
  const {
    Icon,
    title,
    to,
    isActive,
    isLast
  } = props;

  return (
    <nav
      className={cx(styles['container'], 'pl-5 pr-5 pt-4 pb-4', { 'mr-2': !isLast })}>
      <div className="mr-2">
        <Icon type={isActive ? 'primary' : 'secondary'}/>
      </div>
      <div>
        <Link to={to}
          className={cx('text text_type_main-default', isActive ? 'text_color_primary' : 'text_color_inactive',
            styles.link)}>{title}</Link>
      </div>
    </nav>
  );
}

export default HeaderBlock;
