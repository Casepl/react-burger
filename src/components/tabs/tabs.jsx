import { useState } from 'react';
import {
  Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';

const Tabs = () => {
  const [current, setCurrent] = useState('bun');

  return (
    <div className={styles.tabs}>
      <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
        Булка
      </Tab>
      <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
        Соус
      </Tab>
      <Tab value='main' active={current === 'main'} onClick={setCurrent}>
        Начинка
      </Tab>
    </div>
  )
}

export default Tabs;
