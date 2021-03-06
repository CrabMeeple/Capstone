import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TracksComponent } from './tracks/tracks.component';
import { RacesComponent } from './races/races.component';
import { HorseFormComponent } from './horse-form/horse-form.component';
import { RaceFormComponent } from './race-form/race-form.component';
import { HorseFormEditComponent } from './horse-form-edit/horse-form-edit.component';
import { RaceFormEditComponent } from './race-form-edit/race-form-edit.component';
import { NavComponent } from './nav/nav.component';




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    TracksComponent,
    RacesComponent,
    HorseFormComponent,
    RaceFormComponent,
    HorseFormEditComponent,
    RaceFormEditComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
