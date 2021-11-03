import { Action, createReducer, on } from '@ngrx/store';
import { TodoDTO } from './models/todo.dto';
import { completeTodo, createTodo, editTodo } from './todo.actions';

export const initialState: TodoDTO[] = [];

const _todoReducer = createReducer(
  initialState,
  on(createTodo, (state, { title }) => [...state, new TodoDTO(title)]),
  on(completeTodo, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: true,
        };
      } else {
        return todo;
      }
    });
  }),
  on(editTodo, (state, { id, title }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: title,
        };
      } else {
        return todo;
      }
    });
  })
);

export function todoReducer(state: TodoDTO[] | undefined, action: Action) {
  return _todoReducer(state, action);
}
