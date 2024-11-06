import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/Models/member';
import { AccountService } from 'src/app/Services/account.service';
import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-member-detail',
  standalone:true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
  imports:[CommonModule, TabsModule,GalleryModule]
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined
  images : GalleryItem[] = []
  constructor(private route: ActivatedRoute, private memberService: MembersService){}
  ngOnInit(): void {
    this.loadMember()
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
