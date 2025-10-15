import React from 'react';
import styles from '../../resources/css/DataTable.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button className={styles.button} {...props}>
    {children}
  </button>
);