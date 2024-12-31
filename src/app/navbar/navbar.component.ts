import { Component, OnInit } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { Observable, of } from 'rxjs';
import { user } from '../Models/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HasRoleDirective } from '../_directives/has-role.directive';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
 
  model : any = {}
  // loggedIn = false
   currentUser : Observable<user | null>=of(null)
  constructor(public accountService : AccountService, private router: Router,
              private toastr: ToastrService
  ) {}

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
      next : _ => {
     this.router.navigateByUrl('/members')
     this.model = {}
    }
        // this.loggedIn = true
      ,
    })
  }

  logOut()
  {
    this.accountService.logOut()
    this.router.navigateByUrl('/')
    this.model = {}
    // this.loggedIn = false
  }
}


