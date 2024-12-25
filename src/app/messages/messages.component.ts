import { Component, OnInit } from '@angular/core';
import { Message } from '../Models/message';
import { MessageService } from '../Services/message.service';
import { Pagination } from '../Models/pagination';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit{
messages: Message[] | undefined
container= "Unread"
pageNumber = 1
pageSize = 5
pagination?: Pagination
loading = false
constructor(private messageService: MessageService){}
ngOnInit(): void {
  
}
loadMessages(){
  this.loading = true
  this.messageService.getMessages(this.pageNumber,this.pageSize, this.container).subscribe({
    next: response => {
      console.log(response)
      this.messages = response.result
      this.pagination = response.pagination
      this.loading = false
    }
  })
}

deleteMessage(id: number){
this.messageService.deleteMessage(id).subscribe({
  next: () => this.messages?.splice(this.messages.findIndex(m => m.id === id), 1)
})
}

pageChanged(event: any){
if(this.pageNumber !== event.page)
{
this.pageNumber = event.page
this.loadMessages()
}
}
}
