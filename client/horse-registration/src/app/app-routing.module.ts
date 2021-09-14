import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { HorseFormEditComponent } from './horse-form-edit/horse-form-edit.component';
import { HorseFormComponent } from './horse-form/horse-form.component';
import { RaceFormEditComponent } from './race-form-edit/race-form-edit.component';
import { RaceFormComponent } from './race-form/race-form.component';
import { RacesComponent } from './races/races.component';
import { TracksComponent } from './tracks/tracks.component';


const routes: Routes = [{
  path: '',
  children: [
    {path: '', component: TracksComponent},
    {path: 'races', component: RacesComponent},
    {path: 'races/addEntrant', component:HorseFormComponent},
    {path: 'races/editEntrant', component:HorseFormEditComponent},
    {path: 'races/addRace', component:RaceFormComponent},
    {path: 'races/editRace', component:RaceFormEditComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
