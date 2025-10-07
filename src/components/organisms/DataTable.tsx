'use client';
import React, { useState } from 'react';
import { SortableHeader } from '../atoms/SortableHeader';
import { TableRow } from '../molecules/TableRow';
import { PaginationControls } from '../molecules/PaginationControls';
import styles from '../../resources/css/DataTable.module.css';

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

export const DataTable: React.FC<DataTableProps> = ({ data, criteria }) => {
  const [sortKey, setSortKey] = useState<'age' | 'sentStatus'>('age');
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // 絞り込み
  const filteredData = data.filter((d) => {
    if (criteria.filterUnsentOnly && d.sentStatus !== '未') return false;
    if (criteria.name && !d.name.includes(criteria.name)) return false;
    if (criteria.nameKana && !d.nameKana.includes(criteria.nameKana)) return false;
    if (criteria.phone && !d.phone.includes(criteria.phone)) return false;
    if (criteria.email && !d.email.includes(criteria.email)) return false;
    return true;
  });

  // ソート
  const sortedData = [...filteredData].sort((a, b) => {
    const v1 = a[sortKey];
    const v2 = b[sortKey];
    if (v1 < v2) return sortAsc ? -1 : 1;
    if (v1 > v2) return sortAsc ? 1 : -1;
    return 0;
  });

  // ページング
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pagedData = sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  const handleSort = (key: 'age' | 'sentStatus') => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>氏名<br />カナ</th>
            <th>電話番号</th>
            <th>メールアドレス</th>
            <SortableHeader
              label="年齢"
              active={sortKey === 'age'}
              ascending={sortAsc}
              onClick={() => handleSort('age')}
            />
            <SortableHeader
              label="送信状況"
              active={sortKey === 'sentStatus'}
              ascending={sortAsc}
              onClick={() => handleSort('sentStatus')}
            />
          </tr>
        </thead>
        <tbody>
          {pagedData.map((d, i) => (
            <TableRow key={i} {...d} />
          ))}
        </tbody>
      </table>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default DataTable;