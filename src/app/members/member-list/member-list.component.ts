import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/Models/member';
import { Pagination } from 'src/app/Models/pagination';
import { user } from 'src/app/Models/User';
import { UserParams } from 'src/app/Models/userParams';
import { AccountService } from 'src/app/Services/account.service';
import { MembersService } from 'src/app/Services/members.service';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  // members$: Observable<Member[]> | undefined
  pagination: Pagination | undefined
  members : Member[] =[]
userParams: UserParams | undefined
user: user | undefined
genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]

  constructor(private membersService: MembersService, private accountService: AccountService){
    this.accountService.currentUser.pipe(take(1)).subscribe({
      next: user=> {
        if(user){
          this.userParams = new UserParams(user);
          this.user = user
        }
      }
    })
  }
  ngOnInit(): void {
    // this.members$ = this.membersService.getMembers()
    this.loadMembers()
  }
loadMembers()
{
  if(!this.userParams) return;
this.membersService.getMembers(this.userParams).subscribe({
  next: response => {
    console.log(response)
    if(response.result && response.pagination){
      this.members = response.result
      this.pagination = response.pagination
    }
  }
})
}
resetFilters(){
  if(this.user){
    this.userParams = new UserParams(this.user)
    this.loadMembers()
  }
}
pageChanged(event: any){
  if( this.userParams &&this.userParams?.pageNumber !== event.page)
  {
    this.userParams.pageNumber = event.page;
    this.loadMembers()
  }

}
}
