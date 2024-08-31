import { useState } from 'react';
import { Button as MuiButton } from '@mui/material';

interface IButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({ onClick, disabled, children }: IButtonProps) {
  return (
    <MuiButton onClick={onClick} disabled={disabled}>
      {children}
    </MuiButton>
  );
}
