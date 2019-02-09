import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public url;
  constructor() {
    this.url = "http://localhost:8080/ci/ci-ecom/";    
  }
}
