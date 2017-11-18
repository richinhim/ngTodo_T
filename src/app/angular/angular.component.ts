import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TodoVO} from "../domain/todo.vo";
import {UserService} from "../user.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ResultVO} from "../domain/result.vo";

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

  // 저정할 데이터
  tempMap = new Map<number, TodoVO>();

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

  // 수정하는 템플릿으로 변경
  save(item: TodoVO) {
    item.isEdited = true;
    // 기존값을 저장
    const newTemp = new TodoVO();
    newTemp.todo = item.todo;
    newTemp.isFinished = item.isFinished;
    this.tempMap.set(item.todo_id, newTemp);
  }

  remove(item: TodoVO) {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      // 서버에 삭제요청을 하고 성공하면 arraylist에서 제거
      this.userService.removeTodo(item.todo_id)
        .then((data: ResultVO) => {
          if (data.result === 0) {
            // 목록에서 제거
            const index = this.todoList.findIndex(value => value.todo_id === item.todo_id);
            this.todoList.splice(index, 1);
          }
        });
    }
  }

  modify(item: TodoVO) {
    // 서버에 수정요청하고 성공시 원 템플릿으로 복원
    this.userService.modifyTodo(item)
      .then((data: TodoVO) => {
        item.isFinished = data.isFinished;
        item.todo = data.todo;
        item.updated = data.updated;
        item.isEdited = false;
      });
  }

  restore(item: TodoVO) {
    item.isEdited = false;
    // 기존값을 복원
    item.todo =  this.tempMap.get(item.todo_id).todo;
    item.isFinished = this.tempMap.get(item.todo_id).isFinished;
  }
}
