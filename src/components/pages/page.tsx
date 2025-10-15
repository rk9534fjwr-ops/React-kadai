'use client';
import React, { useState, useEffect } from 'react';
import { SearchForm } from '../organisms/SearchForm';
import { DataTable } from '../organisms/DataTable';
import type { SearchCriteria, UserData } from '@/resources/types/UserData';

// サンプルJSONデータ（APIの代わり）
const sampleData: UserData[] = [
  { name: '田中 太郎', nameKana: 'タナカ タロウ', phone: '090-9999-8888', email: 'test@tes.com', age: 10, sentStatus: '済' },
  { name: '田中 太郎2', nameKana: 'タナカ タロウ2', phone: '090-9999-8888', email: 'test@tes.com', age: 20, sentStatus: '未' },
  { name: '田中 太郎3', nameKana: 'タナカ タロウ3', phone: '090-9999-8888', email: 'test@tes.com', age: 30, sentStatus: '済' },
  { name: '田中 太郎4', nameKana: 'タナカ タロウ4', phone: '090-9999-8888', email: 'test@tes.com', age: 40, sentStatus: '未' },
  // 必要に応じて追加
];

const UserSearchTemplate: React.FC = () => {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    name: '',
    nameKana: '',
    phone: '',
    email: '',
    filterUnsentOnly: false,
  });

  const [data, setData] = useState<UserData[]>([]);

  // 初回レンダリングでサンプルデータをセット
  useEffect(() => {
    setData(sampleData);
  }, []);

  // 検索ボタン押下時
  const handleSearch = (newCriteria: SearchCriteria) => {

    console.log("検索条件:", newCriteria);

    setCriteria(newCriteria);

    // 条件に合わせてデータをフィルタリング
    const filtered = sampleData.filter(user => {
      const matchName = user.name.includes(newCriteria.name);
      const matchNameKana = user.nameKana.includes(newCriteria.nameKana);
      const matchPhone = user.phone.includes(newCriteria.phone);
      const matchEmail = user.email.includes(newCriteria.email);
      const matchSent = newCriteria.filterUnsentOnly
        ? user.sentStatus.trim() === '未' // ← trim() で空白を除去
        : true;

      return matchName && matchNameKana && matchPhone && matchEmail && matchSent;
    });

    setData(filtered);
  };

  // クリアボタン押下時
  const handleClear = () => {
    setCriteria({
      name: '',
      nameKana: '',
      phone: '',
      email: '',
      filterUnsentOnly: false,
    });
    setData(sampleData); // クリア時は全件表示
  };

  return (
    <div>
      <SearchForm
        initialCriteria={criteria}
        onSearch={handleSearch}
        onClear={handleClear}
      />
      <DataTable data={data} criteria={criteria} />
    </div>
  );
};

export default UserSearchTemplate;