import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TodoVO} from "../domain/todo.vo";
import {UserService} from "../user.service";

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AngularComponent implements OnInit {
  newTodo = new TodoVO();
  todoList = new Array<TodoVO>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getTodoList();
  }

  add_todo() {
    console.log('click');
  }

  getTodoList() {
    this.userService.getTodoList()
      .then((data: Array<TodoVO>) => {
        console.log(data);
        this.todoList = data;
      });
  }
}
