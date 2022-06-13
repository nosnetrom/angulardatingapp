import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: any; // Used to define user type when passed to Register component

  //constructor() { }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers(); // For passing data to Register component
  }

  // Method used to get and pass users to Register component
  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe(users => {this.users = users});
  }


}
