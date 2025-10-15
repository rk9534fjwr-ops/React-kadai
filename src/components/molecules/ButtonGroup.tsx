'use client';
import React from 'react';
import { Button } from '../atoms/SearchButton';

interface ButtonGroupProps {
  onSearch: () => void;
  onClear: () => void;
  searchClass?: string;
  clearClass?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ onSearch, onClear, searchClass, clearClass }) => (
  <div>
    <Button onClick={onSearch} className={searchClass}>検索</Button>
    <Button onClick={onClear} className={clearClass}>検索解除</Button>
  </div>
);