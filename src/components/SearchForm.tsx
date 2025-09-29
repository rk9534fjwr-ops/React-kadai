  'use client';
  import React, { useState, useEffect } from 'react';
  import styles from './SearchForm.module.css';

  interface SearchCriteria {
    name: string;
    nameKana: string;
    phone: string;
    email: string;
    filterUnsentOnly: boolean;
  }

  interface SearchFormProps {
    initialCriteria: SearchCriteria;  // ←ここを使う
    onSearch: (criteria: SearchCriteria) => void;
    onClear: () => void;
  }

  const SearchForm: React.FC<SearchFormProps> = ({ initialCriteria, onSearch, onClear }) => {
    const [form, setForm] = useState<SearchCriteria>(initialCriteria);

    useEffect(() => {
      setForm(initialCriteria);
    }, [initialCriteria]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

    const handleSearchClick = () => {
      onSearch(form);
    };

    const handleClearClick = () => {
      setForm({
        name: '',
        nameKana: '',
        phone: '',
        email: '',
        filterUnsentOnly: false,
      });
      onClear();
    };

    return (
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        <div className={styles.row}>
          <label htmlFor="name">氏名：</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} className={styles.input} />
          <label htmlFor="nameKana">氏名カナ：</label>
          <input id="nameKana" name="nameKana" value={form.nameKana} onChange={handleChange} className={styles.input} />
        </div>
        <div className={styles.row}>
          <label htmlFor="phone">電話番号：</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} className={styles.input} />
          <label htmlFor="email">メールアドレス：</label>
          <input id="email" name="email" value={form.email} onChange={handleChange} className={styles.input} />
        </div>
        <div className={styles.buttonWrapper}>
          <button type="button" onClick={handleSearchClick} className={styles.searchButton}>
          検索
          </button>
          <button type="button" onClick={handleClearClick} className={styles.clearButton}>
          検索解除
          </button>
        </div>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" name="filterUnsentOnly" checked={form.filterUnsentOnly} onChange={handleChange} />
          未でフィルタする
        </label>
      </form>
    );
  };

  export default SearchForm;