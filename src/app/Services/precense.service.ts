import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { user } from '../Models/User';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrecenseService {
hubUrl = environment.hubUrl
private hubConnection?: HubConnection

private onlineUsersSource = new BehaviorSubject<string[]>([]);
onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) { }

  createHubConnection(user: user){
    this.hubConnection = new HubConnectionBuilder()
                        .withUrl(this.hubUrl+ 'precense', {
                          accessTokenFactory:()  => user.token!
                        }).withAutomaticReconnect()
                        .build()
   this.hubConnection.start().catch(error => console.log(error))

   this.hubConnection.on('UserIsOnline', username => {
    this.onlineUsers$.pipe(take(1)).subscribe({
      next: usernames => this.onlineUsersSource.next([...usernames, username])
    })

    this.toastr.info(username + ' has connected')
   })
   this.hubConnection.on('UserIsOffline', username => {
    this.onlineUsers$.pipe(take(1)).subscribe({
      next: usernames => this.onlineUsersSource.next(usernames.filter(x => x !== username))
    })
    
    this.toastr.warning(username + ' has disconnected')
   })
   this.hubConnection.on('GetOnlineUsers', usernames => {
    this.onlineUsersSource.next(usernames)
   })

   this.hubConnection.on('NewMessageRecieved', ({username, knownAs}) => {
    this.toastr.info(knownAs + ' sent you a message! Click to see it !')
    .onTap
    .pipe(take(1))
    .subscribe({
      next: () => this.router.navigateByUrl('/members/' + username + '?tab=Messages')
    })
   })
  }

  stopHubConnection(){
    this.hubConnection?.stop().catch(error => console.log(error))
  }
}
