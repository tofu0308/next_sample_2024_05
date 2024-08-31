'use client';
import { useState } from 'react';

import Button from '../Common/Button';

interface ITimerProps {}

export default function Timer({}: ITimerProps) {
  return (
    <div>
      <Button onClick={() => console.log('clicked')} disabled={false}>
        test
      </Button>
    </div>
  );
}
