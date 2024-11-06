import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerMode = false
  users:any
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    
  }

  // getUsers()
  // {
  //   this.http.get(`https://localhost:7283/api/users`).subscribe(
  //     response => {
  //       this.users = response
  //       console.log(this.users)
  //     },
  //     error => {
  //       console.log(error)
  //     },
  //     () =>
  //     {
  //       console.log(' the request success !')
  //     }
  //   )
  // }

  
registerToggle()
{
  this.registerMode = !this.registerMode
}
cancleRegisterMode(event : boolean)
{
this.registerMode=event
}
}
