import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertorsComponent } from './convertors.component';

const routes: Routes = [{ path: '', component: ConvertorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvertorsRoutingModule { }
