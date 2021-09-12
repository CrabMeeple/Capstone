import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorseFormComponent } from './horse-form/horse-form.component';
import { RacesComponent } from './races/races.component';
import { TracksComponent } from './tracks/tracks.component';


const routes: Routes = [{
  path: '',
  children: [
    {path: '', component: TracksComponent},
    {path: 'races', component: RacesComponent},
    {path: 'addEntrant', component:HorseFormComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
