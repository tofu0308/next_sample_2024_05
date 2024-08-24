'use client';

import { useEffect, useState } from 'react';
import { Stack, Button, Input, Typography, List, ListItem, Checkbox, Select, MenuItem } from '@mui/material';
import { Add, Delete, DeleteOutline, RestoreFromTrash } from '@mui/icons-material';
import localforage from 'localforage';
import { isTodos } from '../../lib/isTodo';

export default function ToDo() {
  const [text, setText] = useState('');
  const [alertText, setAlertText] = useState('');
  const [todos, setTodos] = useState<IToDo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  // キー名 'todo-20200101' のデータを取得
  useEffect(() => {
    localforage.getItem('todo-20200101').then((values) => isTodos(values) && setTodos(values));
  }, []);

  // State更新時の保存
  useEffect(() => {
    localforage.setItem('todo-20200101', todos);
  }, [todos]);

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

  const handleTodo = <K extends keyof IToDo, V extends IToDo[K]>(id: number, key: K, value: V) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value };
        } else {
          return todo;
        }
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

  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  return (
    <Stack sx={{ marginTop: '32px' }} height="100lvh" justifyContent="" alignItems="center" gap="32px">
      <Typography variant="inherit" component="div">
        ToDo
      </Typography>

      <Select defaultValue="all" onChange={(e) => handleFilter(e.target.value as Filter)}>
        <MenuItem value="all">すべてのタスク</MenuItem>
        <MenuItem value="checked">完了したタスク</MenuItem>
        <MenuItem value="unchecked">現在のタスク</MenuItem>
        <MenuItem value="removed">ごみ箱</MenuItem>
      </Select>
      {filter === 'removed' ? (
        <Button onClick={handleEmpty} disabled={todos.filter((todo) => todo.removed).length === 0}>
          <DeleteOutline />
          ごみ箱を空にする
        </Button>
      ) : (
        filter !== 'checked' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Input type="text" value={text} onChange={(e) => handleChange(e)} />
            <Button type="submit" onSubmit={handleSubmit}>
              <Add />
            </Button>
          </form>
        )
      )}

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
              <Checkbox
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleTodo(todo.id, 'checked', !todo.checked)}
              />
              <Input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleTodo(todo.id, 'value', e.target.value)}
              />
              <Button onClick={() => handleTodo(todo.id, 'removed', !todo.removed)}>
                {todo.removed ? <RestoreFromTrash /> : <Delete sx={{ color: '#666' }} />}
              </Button>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
