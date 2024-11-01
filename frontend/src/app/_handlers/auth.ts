import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authApiUrl = 'http://localhost:3000/auth';
  private refTokenApiUrl = 'http://localhost:3000/refresh-token'
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken())

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http.post(`${this.authApiUrl}/signup`, { email, password }).pipe(
      map((response: any) => {
        if (response && response.jwsToken) {
          this.setToken(response.jwsToken);
          this.isLoggedInSubject.next(true);
        }
        return response;
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post(`${this.authApiUrl}/login`, { email, password }).pipe(
      switchMap((response: any) => {
        if (response && response.jwsToken) {
          this.setToken(response.jwsToken);
          this.isLoggedInSubject.next(true);

          return this.http.post(`${this.refTokenApiUrl}/create`, {}, { withCredentials: true }).pipe(
            map(() => response)
          )
        }
        return of(response);
      })
    );
  }

  getToken() {
    return localStorage.getItem('jwsToken');;
  }

  setToken(token: string) {
    localStorage.setItem('jwsToken', token);
  }

  private hasToken() {
    return !!localStorage.getItem('jwsToken');
  }

  logout() {
    localStorage.removeItem('jwsToken');
    this.http.patch(`${this.refTokenApiUrl}/invalided`, {}, { withCredentials: true}).subscribe(req => {})
    this.router.navigate(['/']);
  }
  
  isAuthenticated() {
    return this.getToken() != null;
  }
}