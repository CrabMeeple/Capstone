import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  constructor(private http: HttpClient) { }

  //TODO: Store urls in single file (Dynamic for environments/ doesn't always run on localhost)
  trackApiUrl = 'http://localhost:8082/api/organizations';
  private subject = new Subject<any>()
  jsonContentTypeHeaders = {
   headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  allRaces;
  data = new BehaviorSubject<Track>({} as any);
  currentData = this.data.asObservable();

  getTracks(): Observable<Track> {
    const results: Observable<Track> = this.http.get<Track>(this.trackApiUrl);
    return results;
  }

  sendSelectedTrack(data): void {
    this.data.next(data);
  }

  getSelectedTrack(): Observable<any> {
    return this.subject.asObservable();
  }
}
