import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactInfo } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly url = `${environment.apiUrl}/contact`;

  constructor(private http: HttpClient) {}

  get(): Observable<ContactInfo> {
    return this.http.get<ContactInfo>(this.url);
  }

  update(data: ContactInfo): Observable<ContactInfo> {
    return this.http.put<ContactInfo>(this.url, data);
  }
}
