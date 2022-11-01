import { useSelector } from 'react-redux';
import {
  Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';
import PropTypes from 'prop-types';

const Tabs = ({ onClick }) => {
  const currentTab = useSelector((store) => store.currentTab);
  console.log(currentTab);
  return (
    <div className={styles.tabs}>
      <Tab value='bun' active={currentTab === 'buns'} onClick={onClick}>
        Булка
      </Tab>
      <Tab value='sauce' active={currentTab === 'sauces'} onClick={onClick}>
        Соус
      </Tab>
      <Tab value='main' active={currentTab === 'mains'} onClick={onClick}>
        Начинка
      </Tab>
    </div>
  )
};

Tabs.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Tabs;
