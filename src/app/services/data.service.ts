import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts`);
  }

  getComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/comments`);
  }

  getAlbums(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/albums`);
  }

  getPhotos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/photos`);
  }

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/todos`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getRecentPhotos(limit: number): Observable<any[]> {
    const url = `${this.apiUrl}/photos?_limit=${limit}&_sort=id&_order=desc`;
    return this.http.get<any[]>(url);
  }

  getPaginatedUsers(page: number, limit: number): Observable<any[]> {
    const url = `${this.apiUrl}/users?_page=${page}&_limit=${limit}`;
    return this.http.get<any[]>(url);
  }
}
