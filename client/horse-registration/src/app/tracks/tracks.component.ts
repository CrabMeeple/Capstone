import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Subscription } from 'rxjs';
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
  trackSubscription: Subscription;
  oaklawn: Track;
  turfway: Track;
  delMar: Track;

  ngOnInit(): void {
    this.getTracks();
  }

  ngOnDestroy(): void {
    this.trackSubscription.unsubscribe();
  }

  getTracks() {
    this.trackSubscription = this.tracksService.getTracks().subscribe((tracks:any) => {
      this.allTracks = tracks;
      for(let track of this.allTracks) {
        switch(track.TrackId) {
          case "Oak":
            this.oaklawn = track;
            break;
          case "Trf":
            this.turfway = track;
          case "Del":
            this.delMar = track;
          default: 
            break;
        }
      }
    },
    err => {
      this.errorMessage = err;
    })
  }

  navigateToRaces(track: Track) {
    localStorage.setItem('track', JSON.stringify(track));
    //this.tracksService.sendSelectedTrack(track);
  }

}
