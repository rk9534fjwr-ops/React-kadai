import React from 'react';
import styles from '../../resources/css/DataTable.module.css';

interface SortableHeaderProps {
  label: string;
  active: boolean;
  ascending: boolean;
  onClick: () => void;
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({ label, active, ascending, onClick }) => (
  <th onClick={onClick} className={styles.sortable}>
    {label} {active ? (ascending ? '▲' : '▼') : '▲▼'}
  </th>
);