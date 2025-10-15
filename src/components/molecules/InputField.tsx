'use client';
import React from 'react';
import { Input } from '../atoms/Input';

interface InputFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string; // 任意に変更
}

export const InputField: React.FC<InputFieldProps> = ({ id, name, value, onChange, className }) => (
  <Input id={id} name={name} value={value} onChange={onChange} className={className} />
);