import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginationHeader, getPaginationResult } from './paginationHelper';
import { Message } from '../Models/message';
import { user } from '../Models/User';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService{
baseUrl = environment.baseUrl
hubUrl = environment.hubUrl
private hubConnection?: HubConnection
private messageThreadSource = new BehaviorSubject<Message[]>([]);
messageThread$ = this.messageThreadSource.asObservable()
  constructor(private http: HttpClient) {

   }
createHubConnection(user: user, otherUsername: string){

this.hubConnection = new HubConnectionBuilder()
                     .withUrl(this.hubUrl + 'message?user=' + otherUsername, {
                      accessTokenFactory: () => user.token!
                     })
                     .withAutomaticReconnect().build();

                     this.hubConnection.start()
                     .then(() => console.log('Hub connection started'))
                     .catch(error => {
                       console.error('Error starting the connection:', error);
                     });

                     this.hubConnection.on('RecieveMessageThread', message => {
                        this.messageThreadSource.next(message)
                     })
                     this.hubConnection.on('newMessage', message => {
                      this.messageThread$.pipe(take(1)).subscribe({
                        next: messages => {
                          this.messageThreadSource.next([...messages, message])
                        }
                      })
                    })
}
stopHubConnection(){
  if(this.hubConnection)
  {
    this.hubConnection.stop()
    this.messageThreadSource.next([]);


  }
}

 getMessages(pageNumber: number, pageSize: number, container: string){
  let params = getPaginationHeader(pageNumber, pageSize)
  params = params.append('Container', container)
  return getPaginationResult<Message[]>(this.baseUrl+'messages', params, this.http)
 } 

getMessageThread(username: string){
return this.http.get<Message[]>(this.baseUrl+'messages/thread/'+username )
}

async sendMessage(username: string, content: string){
  // return this.http.post<Message>(this.baseUrl + 'messages', {recipientUsername: username, content})
  return this.hubConnection?.invoke('SendMessage', {recipientUsername: username, content})
  .catch(error => console.log(error))
}

deleteMessage(id: number){
  return this.http.delete(this.baseUrl + 'messages/' + id )
}
}
