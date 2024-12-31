import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { Message } from 'src/app/Models/message';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-message',
  standalone:true,
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.scss'],
  imports:[CommonModule, TimeagoModule, FormsModule]
})
export class MemberMessageComponent implements OnInit {
  @ViewChild ('messageForm') messageForm?: NgForm
@Input() username?: string;
@Input() messages?: Message[]
messageContent = ''
constructor(public messageService: MessageService){

}
ngOnInit(): void {

}
sendMessage(){
  if(!this.username) return;
  this.messageService.sendMessage(this.username, this.messageContent).then(() => {

   this.messageForm?.reset()
      
  })
}

}
