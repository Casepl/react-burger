import React from 'react';
import cx from 'classnames';
import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={cx(styles.dash, styles.one)}></div>
      <div className={cx(styles.dash, styles.two)}></div>
      <div className={cx(styles.dash, styles.three)}></div>
      <div className={cx(styles.dash, styles.four)}></div>
    </div>
  );
};

export default Loader;
