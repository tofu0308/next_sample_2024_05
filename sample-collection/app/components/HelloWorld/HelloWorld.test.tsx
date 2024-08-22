import { render } from '@testing-library/react';
import HelloWorld from './index';

describe('Helllo, World', () => {
  test('テキストHelllo, World!が表示されること', () => {
    const { getByText } = render(<HelloWorld />);
    console.log(getByText);
    expect(getByText('Hello, World!')).toBeTruthy();
  });
});
