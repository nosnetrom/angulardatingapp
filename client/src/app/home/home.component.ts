import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  // users: any; // Used to define user type when passed to Register component

  // constructor(private http: HttpClient) { } // Used when getting data to pass to Register component
  constructor() { }

  ngOnInit(): void {
    // this.getUsers(); // For passing data to Register component
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  // Method used to get and pass users to Register component
  // getUsers() {
  //   this.http.get('https://localhost:5001/api/users').subscribe(users => {this.users = users});
  // }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}
