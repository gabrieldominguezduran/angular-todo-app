import { Action, createReducer, on } from '@ngrx/store';
import { TodoDTO } from './models/todo.dto';
import {
  completeTodo,
  createTodo,
  deleteTodo,
  editTodo,
  deleteAllTodos,
  completeAllTodos,
} from './todo.actions';

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
  on(completeAllTodos, (state) => {
    return state.map((todo) => {
      return {
        ...todo,
        done: true,
      };
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
  }),
  on(deleteTodo, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(deleteAllTodos, (state) => state.filter((todo) => todo !== todo))
);

export function todoReducer(state: TodoDTO[] | undefined, action: Action) {
  return _todoReducer(state, action);
}
