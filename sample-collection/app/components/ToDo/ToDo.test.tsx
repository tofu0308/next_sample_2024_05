import { render, screen, fireEvent } from '@testing-library/react';

import ToDo from './ToDo';

describe('ToDo', () => {
  test('カウンターの初期値が0であること', () => {
    render(<ToDo />);
    expect(screen.getByText('0')).toBeTruthy();
  });
});
