import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken())

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/signup`, { email, password }).pipe(
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
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      map((response: any) => {
        if (response && response.jwsToken) {
          this.setToken(response.jwsToken);
          this.isLoggedInSubject.next(true);
        }
        return response;
      })
    );
  }

  getToken() {
    return localStorage.getItem('jwsToken');;
  }

  private setToken(token: string) {
    localStorage.setItem('jwsToken', token);
  }

  private hasToken() {
    return !!localStorage.getItem('jwsToken');
  }

  logout() {
    localStorage.removeItem('jwsToken');
    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.getToken() != null;
  }
}