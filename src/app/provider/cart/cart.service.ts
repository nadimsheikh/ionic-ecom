import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { UserService } from '../account/user/user.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  public formData: FormData = new FormData();
  public responseData: any;
  private url;
  constructor(public http: HttpClient,
    public configService: ConfigService,
    public userService: UserService) { }

  public list(data: any) {
    this.formData = new FormData();

    this.formData.append('token', this.userService.getToken());

    if (data.draw) {
      this.formData.append('draw', data.draw);
    }

    if (data.length) {
      this.formData.append('length', data.length);
    }

    if (data.start) {
      this.formData.append('start', data.start);
    }

    if (data.search) {
      this.formData.append('search[value]', data.search.value);
    }

    if (data.order) {
      this.formData.append('order[0][column]', data.order[0].column);
      this.formData.append('order[0][dir]', data.order[0].dir);
    }

    this.url = `${this.configService.url}cart/carts`;
    return this.http.post<any>(this.url, this.formData).pipe(
      // retry(1), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  public add(data: any) {
    this.formData = new FormData();
    this.url = `${this.configService.url}cart/carts/save`;
    this.formData.append('token', this.userService.getToken());
    this.formData.append('customer_id', this.userService.getId());
    this.formData.append('product_id', data.product_id);
    this.formData.append('quantity', data.quantity);
    this.formData.append('status', '1');
    return this.http.post<any>(this.url, this.formData).pipe(
      // retry(1), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  public edit(data: any) {
    this.formData = new FormData();

    this.url = `${this.configService.url}cart/carts/save`;
    this.formData.append('id', data.id);
    this.formData.append('token', this.userService.getToken());
    this.formData.append('customer_id', this.userService.getId());
    this.formData.append('product_id', data.product_id);
    this.formData.append('quantity', data.quantity);
    return this.http.post<any>(this.url, this.formData).pipe(
      // retry(1), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  public detail(id: any) {
    this.formData = new FormData();

    this.url = `${this.configService.url}cart/carts/detail`;
    this.formData.append('id', id);
    return this.http.post<any>(this.url, this.formData).pipe(
      // retry(1), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  public delete(id: any) {
    this.url = `${this.configService.url}cart/carts/delete/` + id;
    return this.http.get<any>(this.url).pipe(
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
