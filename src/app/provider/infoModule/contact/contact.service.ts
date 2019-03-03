import { Injectable } from '@angular/core';
import { ConfigService } from '../../config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public formData: FormData = new FormData();
  public responseData: any;
  private url;
  constructor(public http: HttpClient, public configService: ConfigService) { }

  public save(data: any) {
    this.formData = new FormData();

    this.formData.append('name', data.name);
    this.formData.append('email', data.email);
    this.formData.append('contact', data.contact);
    this.formData.append('text', data.text);
    this.formData.append('status', '1');
    this.url = `${this.configService.url}information/inquiries/save`;
    return this.http.post<any>(this.url, this.formData).pipe(
      // retry(1), // retry a failed request up to 3 times
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
