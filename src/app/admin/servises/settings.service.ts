import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SettingsService {

  constructor(private http: HttpClient) { }

  update(): Observable<any> {
    return this.http.get(`http://localhost:3000/update`);
  }

  clear(): Observable<any> {
    return this.http.get(`http://localhost:3000/clear`);
  }

}
