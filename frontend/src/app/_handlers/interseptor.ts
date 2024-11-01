import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, retry, switchMap, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshing = false;

  constructor(private authService: AuthService, private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${this.authService.getToken()}`}});

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.refreshing) {
          this.refreshing = true;
          return this.refreshAccessToken().pipe(
            switchMap(() => {
              this.refreshing = false;
              const newAuthReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.authService.getToken()}`
                }
              });
              return next.handle(newAuthReq);
            })
          );
        }
        return throwError(error);
      })
    );
  }

  private refreshAccessToken(): Observable<any> {
    return this.http.post<{ jwsToken: string }>('http://localhost:3000/refresh-token/refresh', {}, { withCredentials: true }).pipe(
      tap((response) => {
        this.authService.setToken(response.jwsToken);
      })
    );
  }
}
