import React from 'react';
import cx from 'classnames';
import AppHeader from './components/app-header';
import BurgerIngredients from './components/burger-ingredients';
import BurgerConstructor from "./components/burger-constructor";
import data from './utils/data';
import styles from './App.module.css';

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
