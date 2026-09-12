import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Blog } from '../models/content.models';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly url = `${environment.apiUrl}/blogs`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.url);
  }

  getById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.url}/${id}`);
  }

  create(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.url, blog);
  }

  update(id: string, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.url}/${id}`, blog);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
