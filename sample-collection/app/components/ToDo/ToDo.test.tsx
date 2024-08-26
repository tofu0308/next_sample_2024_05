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

    test('SelectBoxの初期値が"すべてのタスク"である', () => {
      const { getByText } = render(<ToDo />);
      expect(getByText('すべてのタスク')).toBeInTheDocument();
    });

    test('ToDo登録用のtextbox、追加ボタンが表示される', () => {
      render(<ToDo />);
      const textbox = screen.getByRole('textbox');
      const button = screen.getByRole('button');

      expect(textbox).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });

  describe('プルダウン操作と絞り込みの実行', () => {
    test('SelectBoxを操作し"完了したタスク"を表示できる', async () => {
      const event = userEvent.setup();
      render(<ToDo />);
      await event.click(screen.getByRole('combobox'));
      await event.click(screen.getByText(/完了したタスク/i));

      expect(screen.getByText('完了したタスク')).toBeInTheDocument();
    });

    test('SelectBoxを操作し"現在のタスク"を表示できる', async () => {
      const event = userEvent.setup();
      render(<ToDo />);
      await event.click(screen.getByRole('combobox'));
      await event.click(screen.getByText(/現在のタスク/i));

      expect(screen.getByText('現在のタスク')).toBeInTheDocument();
    });

    test('SelectBoxを操作し"ごみ箱"を表示できる', async () => {
      const event = userEvent.setup();
      render(<ToDo />);
      await event.click(screen.getByRole('combobox'));
      await event.click(screen.getByText(/ごみ箱/i));

      expect(screen.getByText('ごみ箱')).toBeInTheDocument();
    });

    test('SelectBoxを操作し"ごみ箱"を表示した場合は”ゴミ箱を空にする”ボタンが表示される', async () => {
      const event = userEvent.setup();
      render(<ToDo />);
      await event.click(screen.getByRole('combobox'));
      await event.click(screen.getByText(/ごみ箱/i));

      expect(screen.getByText('ごみ箱を空にする')).toBeInTheDocument();
    });

    test('SelectBoxを操作し"すべてのタスク"を再び表示できる', async () => {
      const event = userEvent.setup();
      render(<ToDo />);
      await event.click(screen.getByRole('combobox'));
      await event.click(screen.getByText(/ごみ箱/i));

      expect(screen.getByText('ごみ箱')).toBeInTheDocument();

      await event.click(screen.getByRole('combobox'));
      await event.click(screen.getByText(/すべてのタスク/i));

      expect(screen.getByText('すべてのタスク')).toBeInTheDocument();
    });
  });

  describe('handleSubmit', () => {
    test('未入力でのToDo追加時に"1文字以上で入力してください"が表示される', async () => {
      render(<ToDo />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      await waitFor(async () => {
        await expect(screen.getByText('1文字以上で入力してください'));
      });
    });
  });
});
