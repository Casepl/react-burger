import { useSelector } from 'react-redux';
import {
  Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';

const Tabs = () => {
  const currentTab = useSelector((store) => store.currentTab);

  return (
    <div className={styles.tabs}>
      <Tab value='bun' active={currentTab === 'buns'}>
        Булка
      </Tab>
      <Tab value='sauce' active={currentTab === 'sauces'}>
        Соус
      </Tab>
      <Tab value='main' active={currentTab === 'mains'}>
        Начинка
      </Tab>
    </div>
  )
};

export default Tabs;
