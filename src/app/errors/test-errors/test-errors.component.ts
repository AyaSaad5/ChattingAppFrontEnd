import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent {
baseURL = "https://localhost:7283/api/"
validationErrors : string[] = []

constructor(private http : HttpClient)
{}

get404Error()
{
   this.http.get(this.baseURL+'buggy/not-found').subscribe({
    next: reponse => console.log(reponse),
    error : error => console.log(error)
   })
}

get400Error()
{
   this.http.get(this.baseURL+'buggy/bad-request').subscribe({
    next: reponse => console.log(reponse),
    error : error =>{ 
      console.log(error)
    }
   })
}

get401Error()
{
   this.http.get(this.baseURL+'buggy/auth').subscribe({
    next: reponse => console.log(reponse),
    error : error => console.log(error)
   })
}

get500Error()
{
   this.http.get(this.baseURL+'buggy/server-error').subscribe({
    next: reponse => console.log(reponse),
    error : error => console.log(error)
   })
}

getValidationError()
{
   this.http.post(this.baseURL+'account/register',{}).subscribe({
    next: reponse => console.log(reponse),
    error : error =>
      {
        this.validationErrors = error
        console.log(this.validationErrors)
      } 
   })
}
}
