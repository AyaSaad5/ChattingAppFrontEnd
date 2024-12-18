import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/Models/member';
import { Pagination } from 'src/app/Models/pagination';
import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  // members$: Observable<Member[]> | undefined
  pagination: Pagination | undefined
  pageNumber = 1
  pageSize = 5
  members : Member[] =[]

  constructor(private membersService: MembersService){}
  ngOnInit(): void {
    // this.members$ = this.membersService.getMembers()
    this.loadMembers()
  }
loadMembers()
{
this.membersService.getMembers(this.pageNumber, this.pageSize).subscribe({
  next: response => {
    if(response.result && response.pagination){
      this.members = response.result
      this.pagination = response.pagination
    }
  }
})
}
}
