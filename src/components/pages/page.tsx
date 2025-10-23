'use client';
import React, { useState, useEffect } from 'react';
import { SearchForm } from '../organisms/SearchForm';
import { DataTable } from '../organisms/DataTable';
import type { SearchCriteria, UserData } from '@/resources/types/UserData';

const UserSearchTemplate: React.FC = () => {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    name: '',
    nameKana: '',
    phone: '',
    email: '',
    filterUnsentOnly: false,
  });

  const [allData, setAllData] = useState<UserData[]>([]);
  const [filteredData, setFilteredData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true); // 読み込み中フラグ
  const [hasSearched, setHasSearched] = useState(false); // ← 検索実行済みフラグを追加

  // ✅ 初回レンダリング時にAPIからデータを取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) throw new Error('APIエラー');
        const json = await res.json();
        setAllData(json.data);
        setFilteredData([]); // ← 初期は空にして非表示
      } catch (error) {
        console.error('データ取得失敗:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ 検索ボタン押下時
  const handleSearch = (newCriteria: SearchCriteria) => {
    setCriteria(newCriteria);
    setHasSearched(true); // ← 検索が行われた

    const filtered = allData.filter((user) => {
      if (newCriteria.filterUnsentOnly && user.sentStatus.trim() !== '未') return false;
      if (newCriteria.name && !user.name.includes(newCriteria.name)) return false;
      if (newCriteria.nameKana && !user.nameKana.includes(newCriteria.nameKana)) return false;
      if (newCriteria.phone && !user.phone.includes(newCriteria.phone)) return false;
      if (newCriteria.email && !user.email.includes(newCriteria.email)) return false;
      return true;
    });

    setFilteredData(filtered);
  };

  // ✅ クリアボタン押下時
  const handleClear = () => {
    const cleared = {
      name: '',
      nameKana: '',
      phone: '',
      email: '',
      filterUnsentOnly: false,
    };
    setCriteria(cleared);
    setFilteredData([]); // ← 非表示に戻す
    setHasSearched(false); // ← 検索前状態に戻す
  };

  // ✅ ローディング中表示
  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '30px' }}>データを読み込み中...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>ユーザー一覧</h1>
      <SearchForm
        initialCriteria={criteria}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      {/* ✅ 検索前は非表示にする */}
      {hasSearched ? (
        <DataTable data={filteredData} criteria={criteria} />
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#777' }}>
          検索条件を入力して「検索」を押してください。
        </p>
      )}
    </div>
  );
};

export default UserSearchTemplate;