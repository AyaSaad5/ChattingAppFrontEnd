import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/Models/member';
import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members: Member[] = []
  constructor(private membersService: MembersService){}
  ngOnInit(): void {
    this.loadMembers()
  }
loadMembers()
{
  this.membersService.getMembers().subscribe({
    next: (member) => {
      this.members = member;
    }
    
  })
  console.log(this.members)
}
}
