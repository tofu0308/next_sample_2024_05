import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BasicModal from './';

const sampleProps = {
  button: 'button text',
  title: 'title',
  children: <p>contents</p>,
};

describe('BasicModal', () => {
  const event = userEvent.setup();
  beforeEach(() => {
    render(<BasicModal {...sampleProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('コンポーネントが正しくレンダリングされる', () => {
    expect(screen.getByText('button text')).toBeInTheDocument();
  });
  test('描画時はModalが表示されていないこと', () => {
    expect(screen.queryByText('contents')).not.toBeInTheDocument();
  });
  test('ボタンをクリックするとmodalが表示されること,また要素の外をクリックすすることでmodalを閉じることができること', async () => {
    const button = screen.getByRole('button');
    await event.click(button);

    expect(screen.queryByText('title')).toBeInTheDocument();
    expect(screen.queryByText('contents')).toBeInTheDocument();

    // 閉じる処理
    screen.debug();

    expect(screen.queryByText('title')).not.toBeInTheDocument();
    expect(screen.queryByText('contents')).not.toBeInTheDocument();
  });
});
