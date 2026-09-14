import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NewsItem } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly url = `${environment.apiUrl}/news`;

  constructor(private http: HttpClient) {}

  list(all = false): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(all ? `${this.url}?all=1` : this.url);
  }

  get(id: string): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${this.url}/${id}`);
  }

  create(item: Partial<NewsItem>): Observable<NewsItem> {
    return this.http.post<NewsItem>(this.url, item);
  }

  update(id: string, item: Partial<NewsItem>): Observable<NewsItem> {
    return this.http.put<NewsItem>(`${this.url}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
