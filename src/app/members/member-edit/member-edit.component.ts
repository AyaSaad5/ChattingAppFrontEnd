import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/Models/member';
import { user } from 'src/app/Models/User';
import { AccountService } from 'src/app/Services/account.service';
import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm | undefined
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm?.dirty){
      $event.returnValue = true
    }
  }

  member : Member | undefined
  user : user | null = null
  constructor(private accountService : AccountService, private memberService : MembersService, private toastr: ToastrService)
  {
     this.accountService.currentUser.pipe(take(1)).subscribe(
      user => {this.user = user}
     )
  }
  ngOnInit(): void {
    
    this.loadMember()
  }
  loadMember()
  {
    this.memberService.getMember(this.user?.username!).subscribe(
      member => { this.member = member }
    )
    console.log(this.member)
  }
  updateMember()
  {
    console.log(this.member)
    this.memberService.updateMember(this.editForm?.value).subscribe( 
      () => {
        this.toastr.success('Profile updated successfully')
        this.editForm?.reset(this.member )
      }
    )

  }
}
