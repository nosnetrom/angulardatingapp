import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Dating App';
  users: any; // Disabling type safety in TypeScript

  //constructor(private http: HttpClient, private accountService: AccountService) {};
  constructor(private accountService: AccountService, private presence: PresenceService) {};
  
  ngOnInit() {
    //this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
    this.presence.createHubConnection(user);
  }
}
