import { Text, Form, TodoList } from 'components';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

export const Todos = () => {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('todos')) || [];
  });
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const handlerSubmit = text => {
    setTodos(prevTodos => {
      return [
        ...prevTodos,
        {
          id: nanoid(),
          text: text,
        },
      ];
    });
  };
  const onHandlerDelete = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <>
      <Form onSubmit={handlerSubmit} />
      {todos.length === 0 && (
        <Text textAlign="center">There are no any todos ...</Text>
      )}
      <TodoList todos={todos} onDelete={onHandlerDelete} />
    </>
  );
};
