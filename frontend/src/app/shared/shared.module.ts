import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[HttpClientModule,ReactiveFormsModule,MatDialogModule]
})
export class SharedModule { }
