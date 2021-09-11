import { Component, OnInit } from '@angular/core';
import { Track } from '../models/track';
import { TracksService } from '../services/tracks.service';

@Component({
  selector: 'hr-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  constructor(private tracksService: TracksService) { }

  allTracks;
  errorMessage: string;

  ngOnInit(): void {
    this.getTracks();
  }

  getTracks() {
    this.tracksService.getTracks().subscribe((tracks:any) => {
      this.allTracks = tracks;
    },
    err => {
      this.errorMessage = err;
    })
  }

}
