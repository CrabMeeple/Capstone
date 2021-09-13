import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Member } from '../models/member';
import { Race } from '../models/race';
import { HorsesService } from '../services/horses.service';
import { RacesService } from '../services/races.service';
import { colorMap } from '../shared/global';

@Component({
  selector: 'hr-horse-form',
  templateUrl: './horse-form.component.html',
  styleUrls: ['./horse-form.component.css']
})
export class HorseFormComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder, private horsesService: HorsesService, private racesService: RacesService) {
    console.log("In constructor");
    this.horseForm = formBuilder.group({
      'HorseName' : [null, [Validators.required]],
      'JockeyName' : [null, [Validators.required]],
      'Odds' : [null, [Validators.required]],
      'HorseColor' : [null, [Validators.required]],
      'MemberEmail' : [null, [Validators.required]],
      'MemberPhone' : [null, [Validators.required]]
    });
   }

  horseForm: FormGroup;
  submit: boolean;
  raceId: number;
  selectedRace: Race;
  mappedColor; 
  raceServiceSubscription: Subscription;
  horseServiceSubscription: Subscription;
  

  ngOnInit(): void {
    this.raceServiceSubscription = this.racesService.currentData.subscribe(race => {
      this.selectedRace = race;
      this.mappedColor = Object.entries(colorMap).slice(0 ,this.selectedRace.MaxGroupSize);
      console.log(this.selectedRace);
      console.log(this.mappedColor);
    });
  }

  ngOnDestroy(): void {
    this.raceServiceSubscription.unsubscribe();
    this.horseServiceSubscription.unsubscribe();
  }

  onSubmit(horse: Member): void {
    console.log(horse);
    this.horsesService.addHorse(this.selectedRace.RaceId, horse).subscribe();
  }

}
