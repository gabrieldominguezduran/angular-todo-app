import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { TodoDTO } from '../models/todo.dto';
import { completeAllTodos, deleteAllTodos } from '../todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: TodoDTO[] = [];
  hasTodos!: boolean;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select('todos').subscribe((todos) => (this.todos = todos));
  }
  completeAllTasks(): void {
    this.store.dispatch(completeAllTodos());
  }

  deleteAllTasks(): void {
    this.store.dispatch(deleteAllTodos());
  }
}
