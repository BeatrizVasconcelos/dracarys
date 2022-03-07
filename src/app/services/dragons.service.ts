import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dragon } from '../models/dragon';
import { NgIf } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DragonsService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Dragon[]> {
    return this.http.get<Dragon[]>(environment.api.baseUrl)
  }

  findOne(id: number): Observable<Dragon> {
    return this.http.get<Dragon>(`${environment.api.baseUrl}/${id}`)
  }  

  save(dragon: Dragon): Observable<Dragon> {
    return this.http.post<Dragon>(environment.api.baseUrl, dragon)
  }

  update(dragon: Dragon): Observable<Dragon> {
    return this.http.put<Dragon>(`${environment.api.baseUrl}/${dragon.id}`, dragon, {});
  }

  delete(id: number): Observable<Dragon> {
    return this.http.delete<Dragon>(`${environment.api.baseUrl}/${id}`);
  }
}
