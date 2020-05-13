import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Kurs } from '../models/kurs.model';

@Injectable({
  providedIn: 'root'
})
export class KursService {
  from = 'ADVCUSD';
  to = 'P24UAH';
  kurses = [];
  kursesChange = new Subject<Kurs[]>();

  constructor(private http: HttpClient) { }

  getCurs() {
    this.http.get<Kurs[]>(`http://localhost:3000/public/getKurs?from=${this.from}&to=${this.to}`).subscribe( kurses  => {
      this.kurses = kurses;
      this.kursesChange.next(this.kurses.slice());
    });
  }

  getValuta(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/public/getValutas`);
  }
}
