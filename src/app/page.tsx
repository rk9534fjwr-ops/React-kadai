'use client';
import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import DataTable from '../components/DataTable';

interface SearchCriteria {
  name: string;
  nameKana: string;
  phone: string;
  email: string;
  filterUnsentOnly: boolean;
}

interface UserData {
  name: string;
  nameKana: string;
  phone: string;
  email: string;
  age: number;
  sentStatus: '済' | '未';
}

const sampleData: UserData[] = [
  { name: '田中 太郎', nameKana: 'タナカ タロウ', phone: '090-9999-8888', email: 'test@tes.com', age: 10, sentStatus: '済' },
  { name: '田中 太郎2', nameKana: 'タナカ タロウ2', phone: '090-9999-8888', email: 'test@tes.com', age: 20, sentStatus: '未' },
  { name: '田中 太郎3', nameKana: 'タナカ タロウ3', phone: '090-9999-8888', email: 'test@tes.com', age: 30, sentStatus: '済' },
  { name: '田中 太郎4', nameKana: 'タナカ タロウ4', phone: '090-9999-8888', email: 'test@tes.com', age: 40, sentStatus: '未' },
  { name: '田中 太郎5', nameKana: 'タナカ タロウ5', phone: '090-9999-8888', email: 'test@tes.com', age: 50, sentStatus: '未' },
  { name: '田中 太郎6', nameKana: 'タナカ タロウ6', phone: '090-9999-8888', email: 'test@tes.com', age: 60, sentStatus: '済' },
  { name: '田中 太郎7', nameKana: 'タナカ タロウ7', phone: '090-9999-8888', email: 'test@tes.com', age: 70, sentStatus: '済' },
  { name: '田中 太郎8', nameKana: 'タナカ タロウ8', phone: '090-9999-8888', email: 'test@tes.com', age: 80, sentStatus: '済' },
  { name: '田中 太郎9', nameKana: 'タナカ タロウ9', phone: '090-9999-8888', email: 'test@tes.com', age: 90, sentStatus: '未' },
  { name: '田中 太郎10', nameKana: 'タナカ タロウ10', phone: '090-9999-8888', email: 'test@tes.com', age: 100, sentStatus: '未' },
  { name: '田中 太郎11', nameKana: 'タナカ タロウ11', phone: '090-9999-8888', email: 'test@tes.com', age: 100, sentStatus: '未' },
];

export default function Home() {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    name: '',
    nameKana: '',
    phone: '',
    email: '',
    filterUnsentOnly: false,
  });

  const [appliedCriteria, setAppliedCriteria] = useState<SearchCriteria>(criteria);

  const handleSearch = (newCriteria: SearchCriteria) => {
    setAppliedCriteria(newCriteria);
  };

  const handleClear = () => {
    const cleared = {
      name: '',
      nameKana: '',
      phone: '',
      email: '',
      filterUnsentOnly: false,
    };
    setCriteria(cleared);
    setAppliedCriteria(cleared);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <SearchForm initialCriteria={criteria} onSearch={handleSearch} onClear={handleClear} />

      {/* 件数表示 */}
      <div style={{ marginTop: '1rem' }}>
        検索結果 {
          sampleData.filter(d => {
            if (appliedCriteria.filterUnsentOnly && d.sentStatus !== '未') return false;
            if (appliedCriteria.name && !d.name.includes(appliedCriteria.name)) return false;
            if (appliedCriteria.nameKana && !d.nameKana.includes(appliedCriteria.nameKana)) return false;
            if (appliedCriteria.phone && !d.phone.includes(appliedCriteria.phone)) return false;
            if (appliedCriteria.email && !d.email.includes(appliedCriteria.email)) return false;
            return true;
          }).length
        } 件
      </div>

      {/* ページネーションは DataTable 側で管理 */}
      <DataTable data={sampleData} criteria={appliedCriteria} />
    </main>
  );
}