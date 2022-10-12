import {useCallback, useEffect, useState} from 'react';
import cx from 'classnames';
import { BurgerIngridientsContext, ErrorContext } from '../../services/app-context';
import fetchIngredients from '../../services/fetch-ingridients';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorModal from '../error-modal/error-modal';
import styles from './app.module.css';


function App() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
      fetchIngredients()
        .then((json) => {
          if (!json.success) {
            throw new Error('Ответ от сервера не `success`');
          }

        setData(json.data);
      }).catch((e) => {
        setError(e.message);
      });
    }, []);

    const handleCloseErrorModal = useCallback(() => {
        setError('');
    }, [])

    return (
      <ErrorContext.Provider value={{setError, error}}>
            <div className={styles.root}>
                <AppHeader/>
                <main className={cx(styles['content-root'])}>
                    <section className={styles['content-container']}>
                        {data ? (<>
                            <BurgerIngredients data={data}/>
                            <BurgerIngridientsContext.Provider value={data}>
                              <BurgerConstructor />
                            </BurgerIngridientsContext.Provider>
                        </>) : null}
                    </section>
                </main>
                {error &&
                    (<ErrorModal onClose={handleCloseErrorModal}>
                        {error}
                    </ErrorModal>)
                }
            </div>
      </ErrorContext.Provider>
    );
}

export default App;
