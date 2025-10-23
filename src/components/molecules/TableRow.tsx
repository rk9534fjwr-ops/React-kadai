import React from 'react';
import { TableCell } from '../atoms/TableCell';

interface TableRowProps {
  name: string;
  nameKana: string;
  phone: string;
  email: string;
  age: number;
  sentStatus: '済' | '未';
}

export const TableRow: React.FC<TableRowProps> = ({ name, nameKana, phone, email, age, sentStatus }) => (
  <tr>
    <TableCell>
      {name}<br />
      <small>{nameKana}</small>
    </TableCell>
    <TableCell>{phone}</TableCell>
    <TableCell>{email}</TableCell>
    <TableCell>{age}</TableCell>
    <TableCell>{sentStatus}</TableCell>
  </tr>
);