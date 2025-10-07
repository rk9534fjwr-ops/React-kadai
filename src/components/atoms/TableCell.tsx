import React from 'react';

interface TableCellProps {
  children: React.ReactNode;
}

export const TableCell: React.FC<TableCellProps> = ({ children }) => <td>{children}</td>;