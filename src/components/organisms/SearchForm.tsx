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
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm(initialCriteria);
  }, [initialCriteria]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (form.name.length > 10) newErrors.name = '氏名は10文字以内で入力してください。';
    if (form.nameKana && !/^[ァ-ヶー ]+$/.test(form.nameKana)) newErrors.nameKana = '氏名カナは全角カタカナで入力してください。';
    if (form.phone && !/^[0-9-]+$/.test(form.phone)) newErrors.phone = '電話番号は数字とハイフンのみ入力できます。';
    else if (form.phone.replace(/-/g, '').length > 11) newErrors.phone = '電話番号は11桁以内で入力してください。';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'メールアドレスの形式が正しくありません。';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    if (validate()) onSearch(form);
  };

  const handleClear = () => {
    setForm({ name: '', nameKana: '', phone: '', email: '', filterUnsentOnly: false });
    setErrors({});
    onClear();
  };

  const renderInput = (id: string, name: keyof SearchCriteria, label: string, value: string) => (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <label htmlFor={id}>{label}</label>
        <InputField
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      {errors[name] && <span className={styles.errorText}>{errors[name]}</span>}
    </div>
  );

  return (
    <form className={styles.form} onSubmit={e => e.preventDefault()}>
      {/* 1行目: 氏名・氏名カナ */}
      <div className={styles.row}>
        {renderInput('name', 'name', '氏名：', form.name)}
        {renderInput('nameKana', 'nameKana', '氏名カナ：', form.nameKana)}
      </div>

      {/* 2行目: 電話番号・メールアドレス */}
      <div className={styles.row}>
        {renderInput('phone', 'phone', '電話番号：', form.phone)}
        {renderInput('email', 'email', 'メールアドレス：', form.email)}
      </div>

      {/* チェックボックス */}
      <Checkbox
        name="filterUnsentOnly"
        checked={form.filterUnsentOnly}
        onChange={handleChange}
        label="未でフィルタする"
        className={styles.checkboxLabel}
      />

      {/* ボタングループ */}
      <ButtonGroup
        onSearch={handleSearch}
        onClear={handleClear}
        searchClass={styles.searchButton}
        clearClass={styles.clearButton}
      />
    </form>
  );
};
