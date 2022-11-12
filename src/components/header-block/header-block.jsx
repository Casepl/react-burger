import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './header-block.module.css';

function HeaderBlock(props) {
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

HeaderBlock.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isLast: PropTypes.bool,
};

export default HeaderBlock;
