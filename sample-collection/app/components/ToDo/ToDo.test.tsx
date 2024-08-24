import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import ToDo from './ToDo';

describe('ToDo', () => {
  test('コンポーネントが正しくレンダリングされる', () => {
    const { getByText } = render(<ToDo />);
    expect(getByText('ToDo')).toBeInTheDocument();
  });
});
