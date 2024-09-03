'use client';
import { useState } from 'react';
import Button from '../Common/Button';
import InputText from '../Common/InputText';
import useSound from 'use-sound';
import Sound from '/sound001.mp3';

interface ITimerProps {}

export default function Timer({}: ITimerProps) {
  const [play] = useSound(Sound);

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
