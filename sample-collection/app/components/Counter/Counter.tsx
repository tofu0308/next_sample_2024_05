'use client';

import { useState } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  color: 'blue',
  border: 'solid 1px',
  margin: '4px',
}));

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Stack height="100lvh" justifyContent="center" alignItems="center" gap="32px">
      <Typography variant="inherit" component="div">
        {count}
      </Typography>
      <Stack direction="row">
        <StyledButton onClick={() => setCount(count + 1)}>+</StyledButton>
        <StyledButton onClick={() => setCount(count - 1)}>-</StyledButton>
      </Stack>
    </Stack>
  );
}
