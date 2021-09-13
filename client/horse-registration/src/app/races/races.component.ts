import { Component, OnInit } from '@angular/core';
import { Race } from '../models/race';
import { Track } from '../models/track';
import { RacesService } from '../services/races.service';

@Component({
  selector: 'hr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

  constructor(private racesService: RacesService) { }

  currentTrack: Track;
  errorMessage: string;
  allRaces: Race[];
  selectedRace: Race;
  viewAll: boolean = true;

  ngOnInit(): void {
    this.getRaces();
  }

  getRaces(): void {
    this.racesService.getRaces().subscribe((races:any) => {
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
