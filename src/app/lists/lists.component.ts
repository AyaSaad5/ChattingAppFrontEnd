import { Component, OnInit } from '@angular/core';
import { Member } from '../Models/member';
import { MembersService } from '../Services/members.service';
import { Pagination } from '../Models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  member: Member[] | undefined
  predicate = 'liked';
pageNumber  =1
pageSize = 5
pagination: Pagination | undefined

constructor(private memberService: MembersService){

}
ngOnInit(): void {
  this.loadLikes()
}
loadLikes(){
  this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe({
    next: response=> {
      this.member = response.result
      this.pagination = response.pagination
    }
  })
}
pageChanged(event: any){
  if(this.pageNumber !== event.page)
  {
    this.pageNumber = event.page;
    this.loadLikes()
  }

}
}
