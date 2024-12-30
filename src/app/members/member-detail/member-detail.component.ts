import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { PrecenseService } from 'src/app/Services/precense.service';
import { take } from 'rxjs';
import { user } from 'src/app/Models/User';

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
  user?:user
  constructor(private route: ActivatedRoute, private accountService: AccountService,
              private messageService: MessageService,
              public precenseService: PrecenseService
  ){
    accountService.currentUser.pipe(take(1)).subscribe({
      next: user => {
        if(user) this.user = user
      }
    })
  }

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
     if(this.activeTab.heading === 'Messages' && this.user){
      console.log(this.user)
       this.messageService.createHubConnection(this.user, this.member.userName)
     }
     else{
      this.messageService.stopHubConnection()
     }
  }

loadMessages(){
  if(this.member){
    this.messageService.getMessageThread(this.member.userName).subscribe({
      next: messages => this.messages = messages
    })
  }
}
// loadMember(){
//   var username = this.route.snapshot.paramMap.get('username')
//   if(!username) return;
//   this.memberService.getMember(username).subscribe({
//     next: (m) =>{
//        this.member = m
//        this.getImages()
//     }
//   })
//   console.log(this.member)
// }

getImages()
{
  if(!this.member) return;
  for(const photo of this.member.photos)
  {
    this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }));
  }
}
}
