import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Race } from '../models/race';
import { Track } from '../models/track';
import { RacesService } from '../services/races.service';
import { TracksService } from '../services/tracks.service';

@Component({
  selector: 'hr-race-form-edit',
  templateUrl: './race-form-edit.component.html',
  styleUrls: ['./race-form-edit.component.css']
})
export class RaceFormEditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private racesService: RacesService, private tracksService: TracksService, private router: Router) { 
    // window.addEventListener("beforeunload", this.askBeforeLeavingPage);
  }

  raceForm: FormGroup;
  track: Track;
  race: Race;
  trackServiceSubscription: Subscription;
  raceServiceSubscription: Subscription;

  ngOnInit(): void {
    if(localStorage.getItem('track')) {
      this.track = JSON.parse(localStorage.getItem('track'));
      this.raceServiceSubscription = this.racesService.currentData.subscribe(race => {
        this.race = race;
      })
      this.raceForm = this.formBuilder.group({
        'SponsorName' : [this.race?.SponsorName, [Validators.required]],
        'SponsorPhone' : [this.race?.SponsorPhone, [Validators.required]],
        'SponsorEmail' : [this.race?.SponsorEmail, [Validators.required]],
        'MaxGroupSize' : [this.race?.MaxGroupSize, [Validators.required, Validators.max(20), Validators.min(1)]]
      });
    }

  }

  // askBeforeLeavingPage(event) {
  //   event.preventDefault();
  //   event.returnValue="Unsaved modifications";
  //   return event;
  // }

  onSubmit(race: Race): void {
    race.TrackName = this.track.TrackName;
    race.RaceId = this.race.RaceId;
    // window.removeEventListener("beforeunload", this.askBeforeLeavingPage);
    this.racesService.editRace(race).subscribe(race => this.router.navigateByUrl('/races'));
  }

}
