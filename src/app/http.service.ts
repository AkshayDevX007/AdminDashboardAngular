import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private API = "http://localhost:8000"

  
  login(path: string, loginData: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.API}/${path}`, loginData);
  }

  logout(sessionId: string) {
    return this.http.post(`${this.API}/auth/logout`, sessionId)
  }

}
