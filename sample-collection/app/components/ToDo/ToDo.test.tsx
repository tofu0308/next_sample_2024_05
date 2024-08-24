import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ToDo from './ToDo';

describe('ToDo', () => {
  describe('コンポーネントが正しくレンダリングされる', () => {
    test('タイトルとして"ToDo"が表示される', () => {
      const { getByText } = render(<ToDo />);
      expect(getByText('ToDo')).toBeInTheDocument();
    });

    test('SelectBoxの初期値が"全てのタスク"である', () => {
      const { getByText } = render(<ToDo />);
      expect(getByText('すべてのタスク')).toBeInTheDocument();
    });

    test('SelectBoxを操作し"完了したタスク"を表示できる', async () => {
      const event = userEvent.setup();
      const content = render(<ToDo />);

      await event.click(screen.getByRole('combobox'));
      await waitFor(async () => await event.click(screen.getByText(/完了したタスク/i)));
    });
    test('SelectBoxを操作し"現在のタスク"を表示できる', async () => {
      const event = userEvent.setup();
      const content = render(<ToDo />);

      await event.click(screen.getByRole('combobox'));
      await waitFor(async () => await event.click(screen.getByText(/現在のタスク/i)));
    });

    test('SelectBoxを操作し"ごみ箱"を表示できる', async () => {
      const event = userEvent.setup();
      const content = render(<ToDo />);

      await event.click(screen.getByRole('combobox'));
      await waitFor(async () => await event.click(screen.getByText(/ごみ箱/i)));
    });
  });
});
