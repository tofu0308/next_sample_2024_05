import { useState } from 'react';
import { Input } from '@mui/material';

interface InputTextProps {
  type?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
}

export default function InputText({ type = 'string', label, onChange, value, disabled }: InputTextProps) {
  return (
    <label>
      {label}
      <Input type={type} value={value} onChange={onChange} disabled={disabled} />
    </label>
  );
}
