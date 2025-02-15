import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { user } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }
getUsersWithRoles(){
  return this.http.get<user[]>(this.baseUrl + 'admin/users-with-roles')
}
updateUserRoles(username: string, roles:string[]){
return this.http.post<string[]>(this.baseUrl+ 'admin/edit-roles/'+
  username+'?roles='+roles,{})
}
}
