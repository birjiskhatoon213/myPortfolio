import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'home/projects/convertors',
    loadChildren: () => import('./convertors/convertors.module').then(m => m.ConvertorsModule),
  },
  {
    path: 'home/projects/convertors/:convertorName',
    loadChildren: () => import('./convertors/convertors.module').then(m => m.ConvertorsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
