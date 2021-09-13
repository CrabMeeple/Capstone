import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Race } from '../models/race';
import { Track } from '../models/track';
import { HorsesService } from '../services/horses.service';
import { RacesService } from '../services/races.service';
import { TracksService } from '../services/tracks.service';

@Component({
  selector: 'hr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css'],
  
})
export class RacesComponent implements OnInit, OnDestroy {

  constructor(private racesService: RacesService, private tracksService: TracksService, private horsesServices: HorsesService) { }

  currentTrack: Track;
  errorMessage: string;
  allRaces: Race[];
  selectedRace: Race;
  viewAll: boolean = true;
  trackServiceSubscription: Subscription;
  race: Race;

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

  ngOnDestroy() {
    this.trackServiceSubscription.unsubscribe();
  }

  deleteHorse(groupId: number, horseId: number) {
    //this.horsesServices.deleteHorse(groupId, horseId).subscribe(horse => this.getRaces(this.currentTrack.TrackId));
    this.horsesServices.deleteHorse(groupId, horseId).subscribe();
    this.selectedRace.Members = this.selectedRace.Members.filter(obj => obj.MemberId !== horseId);
    this.setRace();
  }

  setRace() {
    this.selectedRace = this.allRaces[0];
  }
}
