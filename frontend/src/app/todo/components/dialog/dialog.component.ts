
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import {  MatDialog  , MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from '../../seriveces/todo.service';
// import {AdminServicesService} from '../../services/admin-services.service'
// import { Iproduct } from 'src/app/products/models/product';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  formToDO:FormGroup;
  actionBtn:string='Save'

  constructor(private fb:FormBuilder,
     public dialogRef: MatDialogRef<DialogComponent >
     ,@Inject(MAT_DIALOG_DATA) public updateToDo:any,
     private toDoServices:TodoService

     ) {
    this. formToDO=this.fb.group({
      name:['',[Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z\s\.]*$/)]],
      discription:['',[Validators.required,Validators.minLength(10)]],
      title:['',[Validators.required,Validators.minLength(5)]],






})

   }

  ngOnInit(): void {

    if(this.updateToDo){
      this.formToDO.get('name')?.setValue(this.updateToDo.name)
      this.formToDO.get('title')?.setValue(this.updateToDo.title)

      this.formToDO.get('discription')?.setValue(this.updateToDo.discription)

      this.actionBtn='Update'

     }

  }
  get name(){
    return this.formToDO.get('name')
  }

  get discription(){
   return this.formToDO.get('discription')
 }

 get title(){
  return this.formToDO.get('title')
}
close(){
  this.dialogRef.close(true);
}
submitForm(){
  if(this.actionBtn==='Save'){

    this.toDoServices.addToDo(this.formToDO.value).subscribe(()=>{
      this.formToDO.reset();
      this.dialogRef.close(true);
      // console.log(this.formToDO.value)

    },(err)=>{
      alert((JSON.stringify(err.error.message) ))
    })
  }
  else{
     this.toDoServices.updateToDo(this.formToDO.value,this.updateToDo._id).subscribe(()=>{
      this.formToDO.reset();
      alert("update successful")
      this.dialogRef.close(true);
      console.log(this.formToDO.value)

    },(err:any)=>{
      alert((JSON.stringify(" failed in update") ))
    })
  }

  }

}
