import {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import {BurgersIngridientsURL} from '../../constants/url-list';
import styles from './app.module.css';

const ShowErrorModal = (props) => {
    const { onClose } = props;

    return (
        <Modal onClose={onClose} header='Не получены данные'>
            <p className="text text_type_main-medium">Попробуйте обновить страницу</p>
        </Modal>
    )
}

ShowErrorModal.propTypes = {
    onClose: PropTypes.func.isRequired
}

function App() {
    const [data, setData] = useState([]);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        fetch(BurgersIngridientsURL).then((resp) => {
            if (!resp.ok) {
                setShowError(true);
                return;
            }

            return resp.json();
        }).then((json) => {
            if (!json.success) {
                setShowError(true);
                return;
            }
            setData(json.data);
        }).catch(() => {
            setShowError(true);
        });

    }, []);

    const handleCloseErrorModal = useCallback(()=>{
        setShowError(false);
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
            {showError && <ShowErrorModal onClose={handleCloseErrorModal} /> }
        </div>
    );
}

export default App;
