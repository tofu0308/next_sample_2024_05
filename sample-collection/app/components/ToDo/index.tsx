'use client';

import { useState } from 'react';
import { Stack, Button, Input, Typography, List, ListItem, Checkbox, Select, MenuItem } from '@mui/material';
import { Add, Delete, RestoreFromTrash } from '@mui/icons-material';

interface IToDo {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
}
type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

export default function ToDo() {
  const [text, setText] = useState('');
  const [alertText, setAlertText] = useState('');
  const [todos, setTodos] = useState<IToDo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const filteredTodos = todos.filter((todo) => {
    // filter ステートの値に応じて異なる内容の配列を返す
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });
  const handleSubmit = () => {
    if (!text) {
      setAlertText('1文字以上で入力してください');
      return;
    }

    const newTodo: IToDo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
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

  const handleRemove = (id: number, removed: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, removed };
        }
        return todo;
      });

      return newTodos;
    });
  };

  const handleFilter = (filter: Filter) => {
    setFilter(filter);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <Stack sx={{ marginTop: '32px' }} height="100lvh" justifyContent="" alignItems="center" gap="32px">
      <Typography variant="inherit" component="div">
        ToDO
      </Typography>

      <Select defaultValue="all" onChange={(e) => handleFilter(e.target.value as Filter)}>
        <MenuItem value="all">すべてのタスク</MenuItem>
        <MenuItem value="checked">完了したタスク</MenuItem>
        <MenuItem value="unchecked">現在のタスク</MenuItem>
        <MenuItem value="removed">ごみ箱</MenuItem>
      </Select>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          type="text"
          value={text}
          disabled={filter === 'checked' || filter === 'removed'}
          onChange={(e) => handleChange(e)}
        />
        <Button type="submit" disabled={filter === 'checked' || filter === 'removed'} onSubmit={handleSubmit}>
          <Add />
        </Button>
      </form>
      <Stack>
        {alertText && (
          <Typography variant="inherit" component="p" color="red">
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
        {filteredTodos.map((todo) => {
          return (
            <ListItem sx={{ padding: '16px 0' }} key={todo.id}>
              <Checkbox disabled={todo.removed} checked={todo.checked} onChange={() => handleCheck(todo.id, !todo.checked)} />
              <Input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
              />
              <Button onClick={() => handleRemove(todo.id, !todo.removed)}>
                {todo.removed ? <RestoreFromTrash /> : <Delete sx={{ color: '#666' }} />}
              </Button>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
