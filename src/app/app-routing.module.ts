import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MedicaComponent } from './medica/medica.component';
import { PhotosComponent } from './photos/photos.component';
import { FormsComponent } from './forms/forms.component';

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
  { path: 'home/projects/medico', component: MedicaComponent },
  { path: 'home/projects/gaze', component: PhotosComponent },
  { path: 'home/projects/forms', component: FormsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
