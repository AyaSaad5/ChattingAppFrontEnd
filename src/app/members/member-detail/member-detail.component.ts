import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { TimeagoModule } from 'ngx-timeago';
import { Member } from 'src/app/Models/member';
import { AccountService } from 'src/app/Services/account.service';
import { MembersService } from 'src/app/Services/members.service';
import { MemberMessageComponent } from '../member-message/member-message.component';
import { MessageService } from 'src/app/Services/message.service';
import { Message } from 'src/app/Models/message';

@Component({
  selector: 'app-member-detail',
  standalone:true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
  imports:[CommonModule, TabsModule, GalleryModule, TimeagoModule, MemberMessageComponent]
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent
  member: Member = {} as Member
  images : GalleryItem[] = []
  activeTab?: TabDirective
  messages: Message[] = []
  constructor(private route: ActivatedRoute, private memberService: MembersService,
              private messageService: MessageService
  ){}
  ngOnInit(): void {
    // this.loadMember()
   this.route.data.subscribe({
    next: data => this.member = data['member']
   })

    this.route.queryParams.subscribe({
      next: params => {
        params['tab'] && this.selectTab(params['tab'])
      }
    })

     this.getImages()
  }

  selectTab(heading: string){
     if(this.memberTabs){
        this.memberTabs.tabs.find(x => x.heading == heading)!.active = true;
    }
  }
  onTabActivated(data: TabDirective){
     this.activeTab = data
     if(this.activeTab.heading === 'Messages'){
       this.loadMessages()
     }
  }

loadMessages(){
  if(this.member){
    this.messageService.getMessageThread(this.member.userName).subscribe({
      next: messages => this.messages = messages
    })
  }
}
loadMember(){
  var username = this.route.snapshot.paramMap.get('username')
  if(!username) return;
  this.memberService.getMember(username).subscribe({
    next: (m) =>{
       this.member = m
       this.getImages()
    }
  })
  console.log(this.member)
}

getImages()
{
  if(!this.member) return;
  for(const photo of this.member.photos)
  {
    this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
  }
}
}
