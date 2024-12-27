import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent {
closeBtnName =''
username=''
availableRoles : any[] = []
selectedRoles: any[] = []
constructor(public bsModalRef: BsModalRef){}

updatedChecked(checkedValue: string){
  const index = this.selectedRoles.indexOf(checkedValue)
  index !== -1 ? this.selectedRoles.splice(index, 1) : this.selectedRoles.push(checkedValue)
}
}
