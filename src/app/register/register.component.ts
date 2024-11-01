import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit{
@Input() usersFromHomeComponent : any;
@Output() cancleRegister = new EventEmitter<any>();

  model : any = {}
  constructor(private accountService: AccountService, private toastr: ToastrService){}
  ngOnInit(): void {
    
  }
register()
{
  this.accountService.register(this.model).subscribe({
    next: () => 
    {
      this.cancle()
    },
    error:error=> this.toastr.error(error.error)
  })
  
}
cancle()
{
 this.cancleRegister.emit(false)
}
}
