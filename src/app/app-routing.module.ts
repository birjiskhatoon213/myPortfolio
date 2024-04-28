import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MedicaComponent } from './medica/medica.component';

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
  { path: 'home/projects/medica', component: MedicaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
