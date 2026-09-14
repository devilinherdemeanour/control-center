import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FirmService } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class FirmServicesService {
  private readonly url = `${environment.apiUrl}/services`;

  constructor(private http: HttpClient) {}

  list(all = false): Observable<FirmService[]> {
    return this.http.get<FirmService[]>(all ? `${this.url}?all=1` : this.url);
  }

  get(id: string): Observable<FirmService> {
    return this.http.get<FirmService>(`${this.url}/${id}`);
  }

  create(item: Partial<FirmService>): Observable<FirmService> {
    return this.http.post<FirmService>(this.url, item);
  }

  update(id: string, item: Partial<FirmService>): Observable<FirmService> {
    return this.http.put<FirmService>(`${this.url}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
