import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { Observable, of } from 'rxjs';
import { user } from '../Models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 
  model : any = {}
  // loggedIn = false
   currentUser : Observable<user | null>=of(null)
  constructor(private accountService : AccountService) {}

  ngOnInit(): void {
    this.getCurrentUser()
    this.currentUser=this.accountService.currentUser
  }

  getCurrentUser()
  {
    this.accountService.currentUser.subscribe({
      // next: user=> this.loggedIn = !!user,
      error: error=> console.log(error)
      
    })
  }
  login()
  {
    this.accountService.login(this.model).subscribe({
      next : response => 
      {
        console.log(response)
        // this.loggedIn = true
      },
      error : error =>  console.log(error)
    })
  }

  logOut()
  {
    this.accountService.logOut()
    // this.loggedIn = false
  }
}


