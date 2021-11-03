import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { TodoDTO } from '../models/todo.dto';
import { completeTodo, editTodo } from '../todo.actions';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css'],
})
export class TodoListItemComponent implements OnInit {
  @Input() todo!: TodoDTO;

  titleInput!: FormControl;
  isEditing!: boolean;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isEditing = false;
    this.titleInput = new FormControl(this.todo.title, Validators.required);
  }

  completeTask(): void {
    this.store.dispatch(completeTodo({ id: this.todo.id }));
  }

  editTask(): void {
    this.isEditing = true;
    this.titleInput.setValue(this.todo.title);
  }

  deleteTask(): void {}

  submitTask(): void {
    this.isEditing = false;

    if (!this.titleInput.invalid && this.titleInput.value !== this.todo.title) {
      this.store.dispatch(
        editTodo({ id: this.todo.id, title: this.titleInput.value })
      );
    }
  }
}
