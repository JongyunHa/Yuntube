import React, { useCallback, useRef } from 'react';
import styles from './styles.module.css';

const SearchHeader = ({ search }) => {
  const inputRef = useRef();

  const handleSearch = () => {
    const value = inputRef.current.value;
    search(value);
  };

  const onClick = () => {
    handleSearch();
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') handleSearch();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.img} src="/images/logo.png" alt="logo" />
        <h1 className={styles.title}>Yuntube</h1>
      </div>
      <input
        className={styles.input}
        type="search"
        ref={inputRef}
        placeholder="Search..."
        onKeyPress={onKeyPress}
      />
      <button className={styles.button} type="submit" onClick={onClick}>
        <img
          className={styles.buttonImage}
          src="/images/search.png"
          alt="search"
        />
      </button>
    </header>
  );
};

export default SearchHeader;
