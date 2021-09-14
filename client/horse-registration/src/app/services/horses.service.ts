import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class HorsesService {

  constructor(private http: HttpClient) { }

  horseApiUrl = 'http://localhost:8082/api/groups';
  private subject = new Subject<any>()
  jsonContentTypeHeaders = {
   headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  allRaces;
  data = new BehaviorSubject<Member>({} as any);
  currentData = this.data.asObservable();

  addHorse(raceId: number, horse: Member) {
    const results: Observable<Member> = this.http.post<Member>(`${this.horseApiUrl}/${raceId}/members`, horse, this.jsonContentTypeHeaders);
    return results;
  }

  deleteHorse(groupId: number, horseId: number) : Observable<Member> {
    const results: Observable<Member> = this.http.delete<Member>(`${this.horseApiUrl}/${groupId}/members/${horseId}`);
    return results;
  }

  editHorse(raceId: number, horse: Member) {
    const results: Observable<Member> = this.http.put<Member>(`${this.horseApiUrl}/${raceId}/members`, horse, this.jsonContentTypeHeaders);
    return results;
  }

  sendSelectedHorse(data): void {
    this.data.next(data);
  }

  getSelectedHorse(): Observable<any> {
    return this.subject.asObservable();
  }
}
