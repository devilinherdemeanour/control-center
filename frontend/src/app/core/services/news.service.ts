import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NewsItem } from '../models/content.models';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly url = `${environment.apiUrl}/news`;

  constructor(private http: HttpClient) {}

  list(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(this.url);
  }

  get(id: string): Observable<NewsItem> {
    return this.http.get<NewsItem>(`${this.url}/${id}`);
  }
}
