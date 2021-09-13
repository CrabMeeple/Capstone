import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Race } from '../models/race';
import { Track } from '../models/track';
import { RacesService } from '../services/races.service';
import { TracksService } from '../services/tracks.service';

@Component({
  selector: 'hr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

  constructor(private racesService: RacesService, private tracksService: TracksService) { }

  currentTrack: Track;
  errorMessage: string;
  allRaces: Race[];
  selectedRace: Race;
  viewAll: boolean = true;
  trackServiceSubscription: Subscription;

  ngOnInit(): void {
   // this.getRaces();
    this.trackServiceSubscription = this.tracksService.currentData.subscribe(track => {
      this.currentTrack = track;
      console.log('current Track');
      console.log(this.currentTrack);
      this.getRaces(this.currentTrack.TrackId);
    });
  }

  getRaces(trackId : string): void {
    // this.racesService.getRaces().subscribe((races:any) => {
    //   this.allRaces = races;
    //   this.allRaces.sort((a,b) => a.RaceId - b.RaceId);
    // },
    // err => {
    //   this.errorMessage = err;
    // });
    this.racesService.getRacesByTrack(trackId).subscribe((races:any) => {
      this.allRaces = races;
      this.allRaces.sort((a,b) => a.RaceId - b.RaceId);
    },
    err => {
      this.errorMessage = err;
    });
  }

  viewAllRaces(): void {
    console.log("View All");
    this.viewAll = true;
  }

  isViewAll(value) {
    this.viewAll = ("ViewAll" === value);
    console.log(this.viewAll);
  }

  addHorse(race: Race) {
    this.racesService.sendSelectedRace(race);
  }
}
