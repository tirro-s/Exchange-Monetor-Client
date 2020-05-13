import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Valuta } from '../interfaces/valuta.interface';

@Injectable()

export class ValService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Valuta[]> {
    return this.http.get<Valuta[]>(`http://localhost:3000/admin/val/getAll`);
  }

  create(cod: string, desq: string): Observable<Valuta> {
    const payload = {
      cod,
      desq
    };
    return this.http.post<Valuta>(`http://localhost:3000/admin/val/create`, payload);
  }

  delete(id: string): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`http://localhost:3000/admin/val/delete/${id}`);
  }

  update(id: string, cod: string, desq: string): Observable<{message: string}> {
    const payload = {
      cod,
      desq
    };
    return this.http.patch<{message: string}>(`http://localhost:3000/admin/val/update/${id}`, payload);
  }
}
