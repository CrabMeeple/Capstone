import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Race } from '../models/race';

@Injectable({
  providedIn: 'root'
})
export class RacesService {

  constructor(private http: HttpClient) { }
    
  //TODO: Store urls in single file (Dynamic for environments/ doesn't always run on localhost)
  raceApiUrl = 'http://localhost:8082/api/groups';
  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  allRaces;

  getRaces() : Observable<Race> {
    const results : Observable<Race> = this.http.get<Race>(this.raceApiUrl);
    console.log(`returned ${results}`);
    return results; 
  }

}
