import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { user } from '../Models/User';
import { environment } from 'src/environments/environment';
import { PrecenseService } from './precense.service';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new BehaviorSubject<user | null>(null);
  currentUser = this.currentUserSource.asObservable()
  baseUrl = environment.baseUrl

  constructor(private http : HttpClient,
              private precense: PrecenseService
  ) { }

  login(model : any)
  {
    return this.http.post<user>(this.baseUrl + 'account/login', model).pipe(
      map((response : user) => {
       const user = response
      if(user)
      {
        this.setCurrentUser(user!)
      }
    })
    )
  }

  logOut()
  {
    localStorage.removeItem('user')
    this.currentUserSource.next(null)
    this.precense.stopHubConnection()
  }

  register(model : any)
  {
     return this.http.post<user>(this.baseUrl+'account/register', model).pipe(
      map(user => 
      {
        if(user)
        {
         
          this.setCurrentUser(user!)
        }
      })
     )
  }
  setCurrentUser(user: user){
    user.roles = []
    const roles = this.getDecodedToken(user.token!).role
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles)
    localStorage.setItem('user',JSON.stringify(user))
   this.currentUserSource.next(user)
   this.precense.createHubConnection(user)
  }

  getDecodedToken(token: string){
return JSON.parse(atob(token.split('.')[1]))
  }
}
