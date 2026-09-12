import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SiteSettings } from '../models/content.models';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly url = `${environment.apiUrl}/settings`;

  constructor(private http: HttpClient) {}

  get(): Observable<SiteSettings> {
    return this.http.get<SiteSettings>(this.url);
  }

  update(settings: SiteSettings): Observable<SiteSettings> {
    return this.http.put<SiteSettings>(this.url, settings);
  }
}
