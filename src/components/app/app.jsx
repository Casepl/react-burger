import {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import checkResponse from '../../utils/checkResponse';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import {BurgersIngridientsURL} from '../../constants/url-list';
import styles from './app.module.css';

const ShowErrorModal = (props) => {
    const {onClose, children} = props;

    return (
        <Modal onClose={onClose} header='Не получены данные'>
            <p className="text text_type_main-medium">
                {children}
            </p>
        </Modal>
    )
}

ShowErrorModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element
}

function App() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(BurgersIngridientsURL)
            .then(checkResponse)
            .then((json) => {
                if (!json.success) {
                    throw new Error('Ответ от сервера не `success`')
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
        <div className={styles.root}>
            <AppHeader/>
            <main className={cx(styles['content-root'])}>
                <section className={styles['content-container']}>
                    {data ? (<>
                        <BurgerIngredients data={data}/>
                        <BurgerConstructor data={data}/>
                    </>) : null}
                </section>
            </main>
            {error &&
                (<ShowErrorModal onClose={handleCloseErrorModal}>
                    {error}
                </ShowErrorModal>)
            }
        </div>
    );
}

export default App;
