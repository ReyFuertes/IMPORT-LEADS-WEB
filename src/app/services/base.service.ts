import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {
  protected baseUrl: string;

  constructor(
    public http: HttpClient, private entity: string) {
    this.baseUrl = environment.apiUrl;
  }

  private getToken(): string {
    return JSON.parse(localStorage.getItem('token') || null) ?
      JSON.parse(localStorage.getItem('token')).token : null;
  }

  protected commonHeaders(): HttpHeaders {
    const contentType = 'application/json';
    return new HttpHeaders({
      'Content-Type': contentType,
      Accept: 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  public post(object?: T, url?: string): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, object, { headers: this.commonHeaders() });
  }

  public get(query?: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}${this.entity}`, { headers: this.commonHeaders() });
  }
}
