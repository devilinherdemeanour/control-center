import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AboutContent } from '../models/content.models';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private readonly url = `${environment.apiUrl}/about`;

  constructor(private http: HttpClient) {}

  get(): Observable<AboutContent> {
    return this.http.get<AboutContent>(this.url);
  }

  update(content: AboutContent): Observable<AboutContent> {
    return this.http.put<AboutContent>(this.url, content);
  }
}
