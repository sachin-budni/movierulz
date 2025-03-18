import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class MovieApiInterceptor implements HttpInterceptor {
  API_URL = 'https://api.themoviedb.org/3';
  API_KEY = 'api_key=' + '4b10cf2f8e6ed1fcb506bd3929ecee40';

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url.replace('api_key=', this.API_KEY);
    if (req.url.includes('.svg')) {
      return next.handle(req);
    }
    const request = req.clone({
      url: this.API_URL + url
    });
    return next.handle(request)
    .pipe(catchError((err: HttpErrorResponse) => {
      return of()
    }));
  }
}
