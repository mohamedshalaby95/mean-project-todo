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
}
