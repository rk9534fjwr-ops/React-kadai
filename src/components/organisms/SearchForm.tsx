'use client';
import React, { useState, useEffect } from 'react';
import { InputField } from '../molecules/InputField';
import { ButtonGroup } from '../molecules/ButtonGroup';
import { Checkbox } from '../atoms/Checkbox';
import styles from '../../resources/css/SearchForm.module.css';

interface SearchCriteria {
  name: string;
  nameKana: string;
  phone: string;
  email: string;
  filterUnsentOnly: boolean;
}

interface SearchFormProps {
  initialCriteria: SearchCriteria;
  onSearch: (criteria: SearchCriteria) => void;
  onClear: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ initialCriteria, onSearch, onClear }) => {
  const [form, setForm] = useState<SearchCriteria>(initialCriteria);

  useEffect(() => {
    setForm(initialCriteria);
  }, [initialCriteria]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <form className={styles.form} onSubmit={e => e.preventDefault()}>
      {/* 1行目: 氏名・氏名カナ */}
      <div className={styles.row}>
        <div className={styles.inputContainer}>
          <label htmlFor="name">氏名：</label>
          <InputField id="name" name="name" value={form.name} onChange={handleChange} className={styles.input} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="nameKana">氏名カナ：</label>
          <InputField id="nameKana" name="nameKana" value={form.nameKana} onChange={handleChange} className={styles.input} />
        </div>
      </div>

      {/* 2行目: 電話番号・メールアドレス */}
      <div className={styles.row}>
        <div className={styles.inputContainer}>
          <label htmlFor="phone">電話番号：</label>
          <InputField id="phone" name="phone" value={form.phone} onChange={handleChange} className={styles.input} />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">メールアドレス：</label>
          <InputField id="email" name="email" value={form.email} onChange={handleChange} className={styles.input} />
        </div>
      </div>

     {/* チェックボックス */}
      <Checkbox
        name="filterUnsentOnly"
        checked={form.filterUnsentOnly}
        onChange={handleChange}
        label="未でフィルタする"
        className={styles.checkboxLabel}
      />

      {/* ボタン */}
      <ButtonGroup
        onSearch={() => onSearch(form)}
        onClear={onClear}
        searchClass={styles.searchButton}
        clearClass={styles.clearButton}
      />
    </form>
  );
};