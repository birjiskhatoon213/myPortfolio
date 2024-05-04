import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ConvertorsRoutingModule } from './convertors-routing.module';
import { ConvertorsComponent } from './convertors.component';


@NgModule({
  declarations: [
    ConvertorsComponent
  ],
  imports: [
    CommonModule,
    ConvertorsRoutingModule,
    FormsModule 
  ]
})
export class ConvertorsModule { }
