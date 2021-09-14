import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member } from '../models/member';
import { Race } from '../models/race';
import { Track } from '../models/track';
import { HorsesService } from '../services/horses.service';
import { RacesService } from '../services/races.service';
import { TracksService } from '../services/tracks.service';
import { colorMap } from '../shared/global';

@Component({
  selector: 'hr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css'],
  
})
export class RacesComponent implements OnInit, OnDestroy {

  constructor(private racesService: RacesService, private tracksService: TracksService, private horsesServices: HorsesService) { 
  }

  currentTrack: Track;
  errorMessage: string;
  allRaces: Race[];
  selectedRace: Race;
  viewAll: boolean = true;
  trackServiceSubscription: Subscription;
  race: Race;

  ngOnInit(): void {
    if(localStorage.getItem('track')) {
      this.currentTrack = JSON.parse(localStorage.getItem('track'));
      this.getRaces(this.currentTrack.TrackId);
    }
  }

  getRaces(trackId : string): void {
    this.racesService.getRacesByTrack(trackId).subscribe((races:any) => {
      this.allRaces = races;
      this.allRaces.sort((a,b) => a.RaceId - b.RaceId);
    },
    err => {
      this.errorMessage = err;
    });
  }

  isViewAll(value) {
    this.viewAll = ("ViewAll" === value);
  }

  addHorse(race: Race) {
    this.racesService.sendSelectedRace(race);
  }

  ngOnDestroy() {
  }

  deleteHorse(groupId: number, horseId: number) {
    this.horsesServices.deleteHorse(groupId, horseId).subscribe();
    this.selectedRace.Members = this.selectedRace.Members.filter(obj => obj.MemberId !== horseId);
  }

  editHorse(race: Race, horse: Member) {
    this.horsesServices.sendSelectedHorse(horse);
    this.racesService.sendSelectedRace(race);
  }

  deleteRace() {
    this.racesService.deleteRace(this.selectedRace.RaceId).subscribe(goal => { this.getRaces(this.currentTrack.TrackId); });
    this.allRaces = this.allRaces.filter(obj => obj.RaceId !== this.selectedRace.RaceId);
    this.viewAll = true;
  }

  editRace() {
    this.racesService.sendSelectedRace(this.selectedRace);
  }
}
