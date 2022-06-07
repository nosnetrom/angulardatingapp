import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { } // Injecting HttpClient into the AccountService

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model); // POST to baseUrl and provide a body for the POST
  }
}
