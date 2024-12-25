import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getPaginationHeader, getPaginationResult } from './paginationHelper';
import { Message } from '../Models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService{
baseUrl = environment.baseUrl
  constructor(private http: HttpClient) {

   }
 getMessages(pageNumber: number, pageSize: number, container: string){
  let params = getPaginationHeader(pageNumber, pageSize)
  params = params.append('Container', container)
  return getPaginationResult<Message[]>(this.baseUrl+'messages', params, this.http)
 } 

getMessageThread(username: string){
return this.http.get<Message[]>(this.baseUrl+'messages/thread/'+username )
}

sendMessage(username: string, content: string){
  return this.http.post<Message>(this.baseUrl + 'messages', {recipientUsername: username, content})
}

deleteMessage(id: number){
  return this.http.delete(this.baseUrl + 'messages/' + id )
}
}
