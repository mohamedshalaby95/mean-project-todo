import { Component, OnInit } from '@angular/core';
import { ItoDo } from 'src/app/shared/todo.type';
import { TodoService } from '../../seriveces/todo.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
    toDos:[ItoDo]

  constructor(public ngxSmartservice:NgxSmartModalService,private todoService:TodoService) {

   }

  ngOnInit(): void {

  this.todoService.getToDos().subscribe((res)=>{

    if(res)
    (this.toDos as any)=res;
    console.log(res)

  });

}

createNewList(){
  this.ngxSmartservice.getModal('myModal').open();
}

  // this.ngxSmartModalService.getModal('myModal').open()




}
