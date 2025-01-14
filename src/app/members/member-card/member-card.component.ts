import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Member } from 'src/app/Models/member';
import { MembersService } from 'src/app/Services/members.service';
import { PrecenseService } from 'src/app/Services/precense.service';
@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit{
  @Input() member: Member | undefined

  constructor(private memberService: MembersService, 
    private toastr: ToastrService,
  public precenseService: PrecenseService){

  }
  ngOnInit(): void {
    
  }
addLike(member: Member){
  this.memberService.addLike(member.userName).subscribe({
    next : () => this.toastr.success("you have liked " + member.knownAs)
  })
}
}
