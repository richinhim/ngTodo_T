import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TodoVO} from "../domain/todo.vo";
import {UserService} from "../user.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations:  [
    trigger('flyInOut', [
      state('In', style({transform: 'translate(0, 0)'})),
      transition('void => *', [
        style({transform: 'translate(-100%, 0)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({transform: 'translate(100%, 0)', opacity: '0'}))
      ])
    ])
  ]

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
    this.userService.addTodo(this.newTodo)
      .then((data: TodoVO) => {
        this.todoList.unshift(data);
        this.newTodo.todo = null;
      });
  }

  getTodoList() {
    this.userService.getTodoList()
      .then((data: Array<TodoVO>) => {
        console.log(data);
        this.todoList = data;
      });
  }
}
