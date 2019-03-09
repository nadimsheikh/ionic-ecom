import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingService {


  public formData: FormData = new FormData();
  public responseData: any;
  private url;
  constructor(public http: HttpClient, public configService: ConfigService) { }

  public currencies(data: any) {
    this.formData = new FormData();

    this.url = `${this.configService.url}common/currencies`;
    return this.http.post<any>(this.url, this.formData).pipe(
      retry(1), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  public countries(data: any) {
    this.formData = new FormData();

    this.url = `${this.configService.url}location/countries`;
    return this.http.post<any>(this.url, this.formData).pipe(
      retry(1), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  public zones(data: any) {
    this.formData = new FormData();
    if (data.country_id) {
      this.formData.append('country_id', data.country_id);
    }
    this.url = `${this.configService.url}location/zones`;
    return this.http.post<any>(this.url, this.formData).pipe(
      retry(1), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }
  public cities(data: any) {
    this.formData = new FormData();
    if (data.country_id) {
      this.formData.append('country_id', data.country_id);
    }
    if (data.zone_id) {
      this.formData.append('zone_id', data.zone_id);
    }
    this.url = `${this.configService.url}location/cities`;
    return this.http.post<any>(this.url, this.formData).pipe(
      retry(1), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a information-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
