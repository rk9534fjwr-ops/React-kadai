'use client';
import React from 'react';

interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ name, checked, onChange, label, className }) => (
  <label className={className}>
    <input type="checkbox" name={name} checked={checked} onChange={onChange} />
    {label}
  </label>
);