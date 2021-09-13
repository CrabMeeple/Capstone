import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class HorsesService {

  constructor(private http: HttpClient) { }

  horseApiUrl = 'http://localhost:8082/api/groups';
  jsonContentTypeHeaders = {
   headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  addHorse(raceId: number, horse: Member) {
    const results: Observable<Member> = this.http.post<Member>(`${this.horseApiUrl}/${raceId}/members`, horse, this.jsonContentTypeHeaders);
    return results;
  }

  deleteHorse(groupId: number, horseId: number) : Observable<Member> {
    const results: Observable<Member> = this.http.delete<Member>(`${this.horseApiUrl}/${groupId}/members/${horseId}`);
    return results;
  }
}
