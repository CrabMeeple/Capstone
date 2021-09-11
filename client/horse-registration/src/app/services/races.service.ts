import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RacesService {

  constructor(private http: HttpClient) { }

  allRaces;

}
