import React from 'react';
import cx from 'classnames';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import data from '../../utils/data';
import styles from './app.module.css';

function App() {
  return (
      <div className={styles.root}>
        <AppHeader />
          <main className={cx(styles['content-root'])}>
              <section className={styles['content-container']}>
                  <BurgerIngredients data={data}/>
                  <BurgerConstructor data={data} />
              </section>
          </main>
      </div>
  );
}

export default App;
