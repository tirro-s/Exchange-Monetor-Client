import { Exchanger } from './../interfaces/exchanger.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ExService {

  constructor(private http: HttpClient) { }

  fetch(): Observable<Exchanger[]> {
    return this.http.get<Exchanger[]>(`http://localhost:3000/admin/ex/getAll`);
  }

  create(name: string, partlink: string, xmlpath: string): Observable<Exchanger> {
    const payload = {
      name,
      partlink,
      xmlpath
    };
    return this.http.post<Exchanger>(`http://localhost:3000/admin/ex/create`, payload);
  }

  delete(id: string): Observable<{massage: string}> {
    return this.http.delete<{massage: string}>(`http://localhost:3000/admin/ex/delete/${id}`);
  }

  update(id: string, name: string, partlink: string, xmlpath: string): Observable<{massage: string}> {
    const payload = {
      name,
      partlink,
      xmlpath
    };
    return this.http.patch<{massage: string}>(`http://localhost:3000/admin/ex/update/${id}`, payload);
  }
}
