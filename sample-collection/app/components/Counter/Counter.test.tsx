import { render, screen, fireEvent } from '@testing-library/react';

import Counter from './Counter';

describe('Counter', () => {
  test('カウンターの初期値が0であること', () => {
    render(<Counter />);
    expect(screen.getByText('0')).toBeTruthy();
  });

  test('インクリメントされること', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByText('1')).toBeTruthy();
  });
  test('デクリメントされること', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('-'));
    expect(screen.getByText('-1')).toBeTruthy();
  });
});
