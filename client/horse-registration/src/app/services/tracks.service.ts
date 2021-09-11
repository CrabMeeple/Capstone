import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  constructor(private http: HttpClient) { }

  //TODO: Store urls in single file (Dynamic for environments/ doesn't always run on localhost)
  trackApiUrl = 'http://localhost:8082/api/organizations';
  jsonContentTypeHeaders = {
   headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  getTracks(): Observable<Track> {
    const results: Observable<Track> = this.http.get<Track>(this.trackApiUrl);
    console.log(`returned ${results}`);
    return results;
  }
}
