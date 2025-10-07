'use client';
import React, { useState } from 'react';
import styles from '../resources/css/DataTable.module.css';

interface UserData {
  name: string;
  nameKana: string;
  phone: string;
  email: string;
  age: number;
  sentStatus: '済' | '未';
}

interface SearchCriteria {
  name: string;
  nameKana: string;
  phone: string;
  email: string;
  filterUnsentOnly: boolean;
}

interface DataTableProps {
  data: UserData[];
  criteria: SearchCriteria;
}

const ITEMS_PER_PAGE = 10;

const DataTable: React.FC<DataTableProps> = ({ data, criteria }) => {
  const [sortKey, setSortKey] = useState<'age' | 'sentStatus'>('age');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // フィルター処理
  const filteredData = data.filter(d => {
    if (criteria.filterUnsentOnly && d.sentStatus !== '未') return false;
    if (criteria.name && !d.name.includes(criteria.name)) return false;
    if (criteria.nameKana && !d.nameKana.includes(criteria.nameKana)) return false;
    if (criteria.phone && !d.phone.includes(criteria.phone)) return false;
    if (criteria.email && !d.email.includes(criteria.email)) return false;
    return true;
  });

  // ソート処理
  const sortedData = [...filteredData].sort((a, b) => {
    const v1 = a[sortKey];
    const v2 = b[sortKey];
    if (v1 < v2) return sortAsc ? -1 : 1;
    if (v1 > v2) return sortAsc ? 1 : -1;
    return 0;
  });

  // ページネーション用に表示データを切り出す
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pagedData = sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 総ページ数
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  const handleSort = (key: 'age' | 'sentStatus') => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>氏名<br />カナ</th>
            <th>電話番号</th>
            <th>メールアドレス</th>
            <th onClick={() => handleSort('age')} className={styles.sortable}>
              年齢 {sortKey === 'age' ? (sortAsc ? '▲' : '▼') : '▲▼'}
            </th>
            <th onClick={() => handleSort('sentStatus')} className={styles.sortable}>
              送信状況 {sortKey === 'sentStatus' ? (sortAsc ? '▲' : '▼') : '▲▼'}
            </th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map((d, i) => (
            <tr key={startIndex + i}>
              <td>
                {d.name}<br />
                <small>{d.nameKana}</small>
              </td>
              <td>{d.phone}</td>
              <td>{d.email}</td>
              <td>{d.age}</td>
              <td>{d.sentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ページ切り替えボタン */}
      <div className={styles.pagination}>
        <button onClick={() => goToPage(1)} disabled={currentPage === 1}>先頭ページ</button>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>前ページ</button>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>次ページ</button>
        <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>最終ページ</button>
      </div>
    </>
  );
};

export default DataTable;