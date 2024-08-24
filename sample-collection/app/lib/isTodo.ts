import { IToDo } from '../components/ToDo/ToDo';

const isTodo = (arg: any): arg is IToDo => {
  return (
    typeof arg === 'object' &&
    Object.keys(arg).length === 4 &&
    typeof arg.id === 'number' &&
    typeof arg.value === 'string' &&
    typeof arg.checked === 'boolean' &&
    typeof arg.removed === 'boolean'
  );
};

export const isTodos = (arg: any): arg is IToDo[] => {
  return Array.isArray(arg) && arg.every(isTodo);
};
