import { authGuard } from './auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todo/components/todos/todos.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path:"" ,component:HomeComponent},
  {path: "", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: "", loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
