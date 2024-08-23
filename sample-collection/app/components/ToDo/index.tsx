'use client';

import { useState } from 'react';
import { Stack, Button, Input, Typography, Modal, List, ListItem, ListItemText, Checkbox } from '@mui/material';

interface IToDo {
  value: string;
  readonly id: number;
  checked: boolean;
}

export default function ToDo() {
  const [text, setText] = useState('');
  const [alertText, setAlertText] = useState('');
  const [todos, setTodos] = useState<IToDo[]>([]);

  const handleSubmit = () => {
    if (!text) {
      setAlertText('1文字以上で入力してください');
      return;
    }

    const newTodo: IToDo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
    };
    setTodos((todos) => [newTodo, ...todos]);
    setText('');
    setAlertText('');
  };

  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value: value };
        }
        return todo;
      });

      // todos ステートを更新
      return newTodos;
    });
  };

  const handleCheck = (id: number, checked: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked };
        }
        return todo;
      });

      return newTodos;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <Stack sx={{ marginTop: '32px' }} height="100lvh" justifyContent="" alignItems="center" gap="32px">
      <Typography variant="inherit" component="div">
        ToDO
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input type="text" value={text} onChange={(e) => handleChange(e)} />
        <Button type="submit" onSubmit={handleSubmit}>
          ADD
        </Button>
      </form>
      <Stack>
        {alertText && (
          <Typography variant="inherit" component="div" color="red">
            {alertText}
          </Typography>
        )}
      </Stack>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          position: 'relative',
          overflow: 'auto',
        }}
      >
        {todos.map((todo) => {
          return (
            <ListItem sx={{ padding: '16px 0' }} key={todo.id}>
              <Checkbox checked={todo.checked} onChange={() => handleCheck(todo.id, !todo.checked)} />
              <Input
                type="text"
                disabled={todo.checked}
                value={todo.value}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
