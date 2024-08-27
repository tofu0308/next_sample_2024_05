import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ToDo from './ToDo';

// mock
jest.spyOn(Storage.prototype, 'getItem').mockImplementation(jest.fn());

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

  describe('タスクの登録', () => {
    test('未登録時のToDoタスク数が0であること', () => {
      render(<ToDo />);

      expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });

    test('未登録状態からタスク登録すると、1件のToDoが表示されること', async () => {
      const event = userEvent.setup();
      render(<ToDo />);

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');
      await event.type(input, 'Task 01');
      await event.click(button);

      expect(screen.queryAllByRole('listitem')).toHaveLength(1);
      expect(screen.getByDisplayValue('Task 01')).toBeInTheDocument();
    });

    test('複数のタスクが登録できること', async () => {
      const event = userEvent.setup();
      render(<ToDo />);

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');
      await event.type(input, 'Task 01');
      await event.click(button);

      await event.type(input, 'Task 02');
      await event.click(button);

      expect(screen.queryAllByRole('listitem')).toHaveLength(2);
      expect(screen.getByDisplayValue('Task 01')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Task 02')).toBeInTheDocument();
    });
    test('登録されたタスクの内容を変更できること', async () => {
      const event = userEvent.setup();
      render(<ToDo />);

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');
      await event.type(input, 'Task 01');
      await event.click(button);

      const list = screen.getAllByRole('list');
      const todoInput = list[0].querySelectorAll('input')[1];

      await event.click(todoInput);
      // 半角スペース込み
      await event.type(todoInput, ' modified');

      expect(screen.getByDisplayValue('Task 01 modified')).toBeInTheDocument();
    });

    test('タスク登録時にtextboxが空欄になること', async () => {
      const event = userEvent.setup();
      render(<ToDo />);

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');
      await event.type(input, 'Task 01');
      // 追加ボタン押下前にtextboxが保持する値の確認
      expect(input).toHaveValue('Task 01');

      await event.click(button);

      expect(input).toHaveValue('');
    });

    test('未入力でのToDo追加時に"1文字以上で入力してください"が表示される', async () => {
      const event = userEvent.setup();
      render(<ToDo />);
      const button = screen.getByRole('button');
      await event.click(button);

      expect(screen.getByText('1文字以上で入力してください'));
    });
  });

  describe('タスクのステータスを変更する', () => {
    test('登録されたタスクをチェックすることで完了状態にできること', async () => {
      const event = userEvent.setup();
      render(<ToDo />);

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');
      await event.type(input, 'Task 01');
      await event.click(button);

      const list = screen.getAllByRole('list');
      const todoCheckbox = list[0].querySelectorAll('input')[0];
      const todoInput = list[0].querySelectorAll('input')[1];

      // checkboxのチェック
      await event.click(todoCheckbox);

      expect(todoCheckbox).toBeChecked();
      expect(todoInput).toBeDisabled();
    });
  });
});
