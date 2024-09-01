'use client';
import { useState } from 'react';

import Button from '../Common/Button';
import InputText from '../Common/InputText';
import { Numans } from 'next/font/google';

interface ITimerProps {}

export default function Timer({}: ITimerProps) {
  return (
    <div>
      <Button onClick={() => console.log('clicked')} disabled={false}>
        test
      </Button>
      <Button onClick={() => console.log('clicked')} disabled={true}>
        test
      </Button>
      <br />
      <InputText label="test" type="number" />

      <InputText label="test" type="number" disabled={true} />
    </div>
  );
}
