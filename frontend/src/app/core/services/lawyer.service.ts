import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Lawyer } from '../models/content.models';

@Injectable({
  providedIn: 'root',
})
export class LawyerService {
  private readonly url = `${environment.apiUrl}/lawyers`;

  constructor(private http: HttpClient) {}

  list(): Observable<Lawyer[]> {
    return this.http.get<Lawyer[]>(this.url);
  }

  get(id: string): Observable<Lawyer> {
    return this.http.get<Lawyer>(`${this.url}/${id}`);
  }
}
