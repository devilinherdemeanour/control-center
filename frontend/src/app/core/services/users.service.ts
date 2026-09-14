import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdminUser } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly url = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  list(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(this.url);
  }

  create(user: Partial<AdminUser>): Observable<AdminUser> {
    return this.http.post<AdminUser>(this.url, user);
  }

  update(id: string, user: Partial<AdminUser>): Observable<AdminUser> {
    return this.http.put<AdminUser>(`${this.url}/${id}`, user);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
