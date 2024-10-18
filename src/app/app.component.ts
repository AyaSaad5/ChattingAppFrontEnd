import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { user } from './Models/User';
import { AccountService } from './Services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'client';
  constructor(private accountService: AccountService){}
  ngOnInit(): void {
   
    this.setCurrentUser()
  }

  setCurrentUser()
  {
    const userString = localStorage.getItem('user')
    if(!userString) return;
    const user:user = JSON.parse(userString)
    this.accountService.setCurrentUser(user)      
  }
}
