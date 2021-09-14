import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Race } from '../models/race';
import { Track } from '../models/track';
import { RacesService } from '../services/races.service';
import { TracksService } from '../services/tracks.service';

@Component({
  selector: 'hr-race-form',
  templateUrl: './race-form.component.html',
  styleUrls: ['./race-form.component.css']
})
export class RaceFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private racesService: RacesService, private tracksService: TracksService) { 
    console.log("In constructor");
    this.raceForm = formBuilder.group({
      'SponsorName' : [null, [Validators.required]],
      'SponsorPhone' : [null, [Validators.required]],
      'SponsorEmail' : [null, [Validators.required]],
      'MaxGroupSize' : [null, [Validators.required, Validators.max(20), Validators.min(1)]]
    });
  }

  raceForm: FormGroup;
  track: Track;
  trackServiceSubscription: Subscription;

  ngOnInit(): void {
    this.trackServiceSubscription = this.tracksService.currentData.subscribe(track => {
      this.track = track;
    });
  }

  onSubmit(race: Race): void {
    race.TrackName = this.track.TrackName;
    this.racesService.addRace(race).subscribe();
  }

}
