import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TodosComponent } from './components/todos/todos.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInseptorsService } from './inseptors/token-inseptors.service';
import { DialogComponent } from './components/dialog/dialog.component';

// import { ToDoFormComponent } from './components/to-do-form/to-do-form.component';


@NgModule({
  declarations: [
    TodosComponent,
    DialogComponent,

  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule,
  
    NgxSmartModalModule.forRoot()
  ],
  // providers:[{provide:HTTP_INTERCEPTORS,useClass:token-TokenInseptorsService,multi:true}]
})
export class TodoModule { }
