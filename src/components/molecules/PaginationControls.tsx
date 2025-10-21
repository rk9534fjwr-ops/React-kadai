import React from 'react';
import { Button } from '../atoms/Button';
import styles from '../../resources/css/DataTable.module.css';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className={styles.pagination}>
    <Button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
      先頭ページ
    </Button>
    <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
      前ページ
    </Button>
    <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
      次ページ
    </Button>
    <Button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
      最終ページ
    </Button>
  </div>
);