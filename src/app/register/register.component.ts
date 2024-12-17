import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { setMinutes } from 'ngx-bootstrap/chronos/utils/date-setters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit{
@Input() usersFromHomeComponent : any;
@Output() cancleRegister = new EventEmitter<any>();
registerForm :  FormGroup = new FormGroup({});
maxDate : Date = new Date()
model : any = {}
validationErrors : string[] | undefined

  constructor(private accountService: AccountService, private toastr: ToastrService, private router : Router,
              private fb : FormBuilder
  ){}
  ngOnInit(): void {
    this.InitializeForm()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  InitializeForm(){
this.registerForm = this.fb.group({
  gender : ['male'],
  username : ['', Validators.required],
  knownAs : ['', Validators.required],
  dateOfBirth : ['', Validators.required],
  city : ['', Validators.required],
  country : ['', Validators.required],
  password :['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
  confirmpassword : ['', [Validators.required, this.matchValues('password')]]
})

this.registerForm.controls['password'].valueChanges.subscribe({
  next: () => this.registerForm.controls['confirmpassword'].updateValueAndValidity()
})
  }
  matchValues(matchTo: string) : ValidatorFn{
return(control: AbstractControl) => {
  return control.value === control.parent?.get(matchTo)?.value ? null : {noMatching : true}
}
  }
register()
{
  const dob = this.getdateOnly(this.registerForm.controls['dateOfBirth'].value)
  const values = {...this.registerForm.value, dateOfBirth : dob}
  console.log(values)
  this.accountService.register(values).subscribe({
    next: () => 
    {
      this.router.navigateByUrl('/members')
      //this.cancle()
    },
    error:error=>  this.toastr.error(error.error)
  })
  
}
cancle()
{
 this.cancleRegister.emit(false)
}
private getdateOnly(dob: string | undefined)
{
    if(!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())).toISOString().slice(0,10)
    }
}
