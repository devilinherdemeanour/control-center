import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Page } from '../models/content.models';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private readonly url = `${environment.apiUrl}/pages`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Page[]> {
    return this.http.get<Page[]>(this.url);
  }

  getById(id: string): Observable<Page> {
    return this.http.get<Page>(`${this.url}/${id}`);
  }

  create(page: Page): Observable<Page> {
    return this.http.post<Page>(this.url, page);
  }

  update(id: string, page: Page): Observable<Page> {
    return this.http.put<Page>(`${this.url}/${id}`, page);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
