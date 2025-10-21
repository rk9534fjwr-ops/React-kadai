'use client';
import React from 'react';

interface InputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ id, name, value, onChange, className }) => (
  <input id={id} name={name} value={value} onChange={onChange} className={className} />
);