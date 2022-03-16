import { Router} from '@angular/router';
import { authService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {Iuser} from '../../../shared/user.type'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  response:Iuser

  constructor(private authService:authService,private router:Router) { }

  ngOnInit(): void {
  }
  login(){

    this.authService.UserLogin({email:"mohamedshala@gmail.com",password:'123456v'}).subscribe((res)=>{
      if(res !=null){
        (this.response as any)=res;


        localStorage.setItem('token',(this.response as any).token)
        localStorage.setItem('dataUser',(this.response as any).fristname)
         this.router.navigate([""])
      }

    },
    (err)=>{
      console.log((JSON.stringify(err.error.message) as any))
    }
    )
  }

}
