import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../Button';

const mockOnClick = jest.fn();

const props = {
  onClick: mockOnClick(),
  disabled: false,
  children: 'Button',
};

describe('Button', () => {
  test('ボタンが表示されること', () => {
    render(<Button {...props} />);

    expect(screen.getByText('Button'));
  });
  test('ボタン押下時にonClickが発火すること', async () => {
    const user = userEvent.setup();
    render(<Button {...props} />);
    const button = screen.getByRole('button');

    await user.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
