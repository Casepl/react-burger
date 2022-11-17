import React from 'react';
import cx from 'classnames';
import styles from '../components/app/app.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients
  from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor
  from '../components/burger-constructor/burger-constructor';

const HomePage = () => {
  return (
    <main className={cx(styles['content-root'])}>
      <section className={styles['content-container']}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>
      </section>
    </main>
  );
}

export default HomePage;
