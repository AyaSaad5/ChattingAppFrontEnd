import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RoleModalComponent } from 'src/app/modals/role-modal/role-modal.component';
import { user } from 'src/app/Models/User';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  standalone: true,
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.scss'],
  imports:[CommonModule]
})
export class UserManagmentComponent implements OnInit{
  users_ : user[] = []
  bsModalRef : BsModalRef<RoleModalComponent> = new BsModalRef<RoleModalComponent>();
availableRoles = [
  'Admin',
  'Moderator',
  'Member'
]
  constructor(private adminService: AdminService, private modalService: BsModalService) {
    
  }
  ngOnInit(): void {
    this.getUsersWithRoles()
  }

getUsersWithRoles(){
  this.adminService.getUsersWithRoles().subscribe((response) => {
this.users_ = response
console.log(this.users_)
  })
  console.log(this.users_)

}

openRolesModal(user: user){
  const config = {
 class: 'modal-dialog-centered',
initialState : {
username: user.username,
availableRoles : this.availableRoles,
selectedRoles: [...user.roles!]

}
  }
  this.bsModalRef = this.modalService.show(RoleModalComponent, config)
  this.bsModalRef.onHide?.subscribe({
    next: () => {
const selectedRoles = this.bsModalRef.content?.selectedRoles
if(!this.arrayEqual(selectedRoles!, user.roles!)){
  this.adminService.updateUserRoles(user.username!, selectedRoles!).subscribe({
    next: roles  => user.roles = roles
  })
}
    }
  })
}

private arrayEqual(arr1: any[], arr2: any[]){
  return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort())
}
}
