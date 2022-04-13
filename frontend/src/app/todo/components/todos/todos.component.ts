import { MatDialog } from '@angular/material/dialog';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ItoDo } from 'src/app/shared/todo.type';
import { TodoService } from '../../seriveces/todo.service';

import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit,OnChanges {
  toDos: [ItoDo];
  toDo: ItoDo;
  flag: number = 0;


  constructor(private dialog: MatDialog, private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();


  }
ngOnChanges(): void {

  this.dispalyToDoInformation(this.toDos[0])

}
  getTodos() {

    this.todoService.getToDos().subscribe((res) => {
      (this.toDos as any) = res;


        this.dispalyToDoInformation(this.toDos[0]);

    });
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.getTodos();
        }
      });
  }

  deleteToDo(todo: ItoDo) {
    const { _id } = todo;
    this.todoService.deleteToDo(_id).subscribe(
      (res) => {
        this.getTodos();
      },
      (err) => {
        alert(`something go wrong ${err}`);
      }
    );
  }

  updateToDo(row: ItoDo) {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.getTodos();
        }
      });
  }
  dispalyToDoInformation(todo: ItoDo) {
    if (todo) {
      this.todoService.getToDo(todo._id).subscribe((res) => {
        this.toDo = res as any;
      });
    }
  }
}
