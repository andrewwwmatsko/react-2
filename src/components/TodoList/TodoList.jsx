import { Grid, TodoListItem } from '..';

export const TodoList = ({ todos, onDelete }) => {
  return (
    <Grid>
      {todos.map((todo, index) => (
        <TodoListItem
          key={todo.id}
          counter={index + 1}
          text={todo.text}
          onDelete={onDelete}
          id={todo.id}
        />
      ))}
    </Grid>
  );
};
