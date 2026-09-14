import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FirmService } from '../models/content.models';

@Injectable({
  providedIn: 'root',
})
export class FirmServicesService {
  private readonly url = `${environment.apiUrl}/services`;

  constructor(private http: HttpClient) {}

  list(): Observable<FirmService[]> {
    return this.http.get<FirmService[]>(this.url);
  }

  get(id: string): Observable<FirmService> {
    return this.http.get<FirmService>(`${this.url}/${id}`);
  }
}
