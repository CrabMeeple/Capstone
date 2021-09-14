import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Member } from '../models/member';
import { Race } from '../models/race';
import { HorsesService } from '../services/horses.service';
import { RacesService } from '../services/races.service';
import { colorMap } from '../shared/global';

@Component({
  selector: 'hr-horse-form-edit',
  templateUrl: './horse-form-edit.component.html',
  styleUrls: ['./horse-form-edit.component.css']
})
export class HorseFormEditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private horsesService: HorsesService, private racesService: RacesService, private router: Router) {
    // window.addEventListener("beforeunload", this.askBeforeLeavingPage);
   }

  horseForm: FormGroup;
  submit: boolean;
  raceId: number;
  selectedRace: Race;
  editHorse: Member;
  mappedColor; 
  raceServiceSubscription: Subscription;
  horseServiceSubscription: Subscription;
  

  ngOnInit(): void {
    this.raceServiceSubscription = this.racesService.currentData.subscribe(race => {
      this.selectedRace = race;
      this.mappedColor = Object.entries(colorMap).slice(0 ,this.selectedRace.MaxGroupSize);
    });
    this.horseServiceSubscription = this.horsesService.currentData.subscribe(horse => {
      this.editHorse = horse;
    })
    this.horseForm = this.formBuilder.group({
      'HorseName' : [this.editHorse?.HorseName, [Validators.required]],
      'JockeyName' : [this.editHorse?.JockeyName, [Validators.required]],
      'Odds' : [this.editHorse?.Odds, [Validators.required]],
      'HorseColor' : [this.editHorse?.HorseColor, [Validators.required]],
      'MemberEmail' : [this.editHorse?.MemberEmail, [Validators.required]],
      'MemberPhone' : [this.editHorse?.MemberPhone, [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.raceServiceSubscription.unsubscribe();
    this.horseServiceSubscription.unsubscribe();
    // window.removeEventListener("beforeunload", this.askBeforeLeavingPage);
  }

  // askBeforeLeavingPage(event) {
  //   event.preventDefault();
  //   event.returnValue="Unsaved modifications";
  //   return event;
  // }

  onSubmit(horse: Member): void {
    horse.MemberId = this.editHorse.MemberId;
    this.horsesService.editHorse(this.selectedRace.RaceId, horse).subscribe(race => this.router.navigateByUrl('/races'));
  }

}
