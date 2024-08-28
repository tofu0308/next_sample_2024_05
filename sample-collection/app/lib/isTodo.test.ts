import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

import { isTodos } from './isTodo';

const correctData = [
  {
    value: 'Task 03',
    id: 1724745693432,
    checked: true,
    removed: false,
  },
  {
    value: 'Task 02',
    id: 1724745689130,
    checked: false,
    removed: true,
  },
  {
    value: 'Task 01',
    id: 1724745671141,
    checked: true,
    removed: true,
  },
];

const deficiencyData = [
  {
    value: 'Task 04',
    id: 1724745693432,
    removed: false,
  },
];
const wrongData = [
  {
    value: 4,
    id: '1',
    checked: 'true',
    removed: 'false',
  },
];

describe('isTodos', () => {
  test('正しいデータの場合isTodosがtrueを返す', () => {
    expect(isTodos(correctData)).toBe(true);
  });
  test('データが欠損している場合isTodosがfalseを返す', () => {
    expect(isTodos(deficiencyData)).toBe(false);
  });

  test('データ形式が誤っている場合isTodosがfalseを返す', () => {
    expect(isTodos(wrongData)).toBe(false);
  });
});
