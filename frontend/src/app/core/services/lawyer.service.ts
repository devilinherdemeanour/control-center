import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Lawyer } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class LawyerService {
  private readonly url = `${environment.apiUrl}/lawyers`;

  constructor(private http: HttpClient) {}

  list(all = false): Observable<Lawyer[]> {
    return this.http.get<Lawyer[]>(all ? `${this.url}?all=1` : this.url);
  }

  get(id: string): Observable<Lawyer> {
    return this.http.get<Lawyer>(`${this.url}/${id}`);
  }

  create(item: Partial<Lawyer>): Observable<Lawyer> {
    return this.http.post<Lawyer>(this.url, item);
  }

  update(id: string, item: Partial<Lawyer>): Observable<Lawyer> {
    return this.http.put<Lawyer>(`${this.url}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
