import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient:HttpClient,private router:Router) {


  }

  getToDos(){
    return this.httpClient.get(`${environment.baseUrl}/todo`)
  }

  addToDo(data:any){
    return this.httpClient.post(`${environment.baseUrl}/todo`,data)
  }
  deleteToDo(id:string){
    return this.httpClient.delete(`${environment.baseUrl}/todo/${id}`)
  }

  updateToDo(data:any,id:any){
    return this.httpClient.patch(`${environment.baseUrl}/todo/${id}`,data)
  }
  getToDo(id:any){
    return this.httpClient.get(`${environment.baseUrl}/todo/${id}`)
  }
}
