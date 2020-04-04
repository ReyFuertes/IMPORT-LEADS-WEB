import { QueryParam } from './../models/generic..model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export abstract class BaseService<T> {
  protected baseUrl: string;

  constructor(
    public http: HttpClient,
    private entity: string) {
    this.baseUrl = environment.apiUrl;
  }

  private getToken(): string {
    return JSON.parse(localStorage.getItem('token') || null) ?
      JSON.parse(localStorage.getItem('token')).token : null;
  }

  protected commonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  public post(object?: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${this.entity}`, object, { headers: this.commonHeaders() });
  }

  public getAll(param?: QueryParam): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}${this.entity}${param && param.query ? '/' + param.query : ''}`, { headers: this.commonHeaders() });
  }

  public upload(object?: any, additionalParam?: string): Observable<T> {
    const formatParam = additionalParam ? `/${additionalParam}`: '';
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      Accept: "application/json"
    });
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<T>(`${this.baseUrl}${this.entity}${formatParam}`, object, { headers: headers });
  }
}
