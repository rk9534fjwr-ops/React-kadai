'use client';
import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ type = 'button', onClick, className, children }) => (
  <button type={type} onClick={onClick} className={className}>
    {children}
  </button>
);