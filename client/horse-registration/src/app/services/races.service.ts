import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Race } from '../models/race';

@Injectable({
  providedIn: 'root'
})
export class RacesService {

  constructor(private http: HttpClient) { }
    
  //TODO: Store urls in single file (Dynamic for environments/ doesn't always run on localhost)
  raceApiUrl = 'http://localhost:8082/api/groups';
  private subject = new Subject<any>()
  jsonContentTypeHeaders = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  allRaces;
  data = new BehaviorSubject<Race>({} as any);
  currentData = this.data.asObservable();

  getRaces() : Observable<Race> {
    const results : Observable<Race> = this.http.get<Race>(this.raceApiUrl);
    console.log(`returned ${results}`);
    return results; 
  }

  sendSelectedRace(data): void {
    console.log(data);
    this.data.next(data);
  }

  getSelectedRace(): Observable<any> {
    return this.subject.asObservable();
  }
  
  getRacesByTrack(organizationId: string): Observable<Race> {
    const results : Observable<Race> = this.http.get<Race>(`${this.raceApiUrl}/byorganization/${organizationId}`);
    return results;
  }

  addRace(race: Race): Observable<Race> {
    const results: Observable<Race> = this.http.post<Race>(this.raceApiUrl, race, this.jsonContentTypeHeaders);
    return results;
  }

  deleteRace(raceId: number): Observable<Race> {
    const results: Observable<Race> = this.http.delete<Race>(`${this.raceApiUrl}/${raceId}`);
    return results;
  }

}
