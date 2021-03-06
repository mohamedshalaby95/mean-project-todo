import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/guards/auth.guard';

import { TodosComponent } from './components/todos/todos.component';

const routes: Routes = [

  {path:"todos" ,component:TodosComponent, canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
