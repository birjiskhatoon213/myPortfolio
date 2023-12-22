import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvertorsRoutingModule } from './convertors-routing.module';
import { ConvertorsComponent } from './convertors.component';


@NgModule({
  declarations: [
    ConvertorsComponent
  ],
  imports: [
    CommonModule,
    ConvertorsRoutingModule
  ]
})
export class ConvertorsModule { }
