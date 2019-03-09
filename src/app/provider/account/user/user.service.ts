import { Injectable } from '@angular/core';
import { ConfigService } from '../../config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public data: any;
  public formData: FormData = new FormData();
  public responseData: any;
  private url;
  constructor(public http: HttpClient, public configService: ConfigService) { }

  public register(data: any) {
    this.formData = new FormData();
    this.formData.append('group_id', '1');
    this.formData.append('name', data.name);
    this.formData.append('email', data.email);
    this.formData.append('contact', data.contact);
    this.formData.append('password', data.password);
    this.formData.append('status', '1');
    this.url = `${this.configService.url}customer/customers/save`;
    return this.http.post<any>(this.url, this.formData).pipe(
      // retry(1), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  public login(data: any) {
    this.formData = new FormData();
    this.formData.append('username', data.username);
    this.formData.append('password', data.password);
    this.formData.append('status', '1');
    this.url = `${this.configService.url}customer/customer_login`;
    return this.http.post<any>(this.url, this.formData).pipe(
      // retry(1), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }


  public getDetail(id: any) {
    this.formData = new FormData();
    this.formData.append('id', id);
    this.formData.append('status', '1');
    this.url = `${this.configService.url}customer/customers/detail`;
    return this.http.post<any>(this.url, this.formData).pipe(
      // retry(1), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  public setStorageData(data: any) {
    localStorage.setItem('user', data);
  }

  public getStorageData() {
    const ObservableData = new Observable(observer => {
      this.data = JSON.parse(localStorage.getItem('user'));
      observer.next(this.data);
      observer.complete();
    });
    return ObservableData;
  }

  public getId() {
    this.data = JSON.parse(localStorage.getItem('user'));
    return this.data.id;
  }
  public getToken() {
    this.data = JSON.parse(localStorage.getItem('user'));
    return this.data.token;
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
