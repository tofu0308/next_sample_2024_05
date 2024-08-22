import { render } from '@testing-library/react';
import HelloWorld from './HelloWorld';

describe('Helllo, World', () => {
  test('テキストHelllo, World!が表示されること', () => {
    const { getByText } = render(<HelloWorld />);
    expect(getByText('Hello, World!')).toBeTruthy();
  });
});
