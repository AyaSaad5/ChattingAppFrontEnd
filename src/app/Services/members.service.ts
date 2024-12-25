import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../Models/member';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../Models/pagination';
import {UserParams} from '../Models/userParams'
import { getPaginationHeader, getPaginationResult } from './paginationHelper';
@Injectable({
  providedIn: 'root'
})
export class MembersService {

  members : Member[] = []
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  getMembers(userParam: UserParams)
  {

     let params = getPaginationHeader(userParam.pageNumber, userParam.pageSize);
      // if (this.members.length > 0) return of (this.members);
     params = params.append('minAge', userParam.minAge)
     params = params.append('maxAge', userParam.maxAge)
     params = params.append('gender', userParam.gender)
     params = params.append('orderBy', userParam.orderBy)

      return getPaginationResult<Member[]>(this.baseUrl + 'users',params, this.http)
   // return this.http.get<Member[]>(this.baseUrl + 'users')
  }




  addLike(username: string){
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }
getLikes(predicate: string, pageNumber: number, pageSize: number){

  let params = getPaginationHeader(pageNumber, pageSize)

  params = params.append('predicate', predicate)

  return getPaginationResult<Member[]>(this.baseUrl+ 'likes', params, this.http)
}

  getMember(username: string)
  {
    const member = this.members.find(u => u.userName === username)
    if(member) return of(member)
    return this.http.get<Member>(`${this.baseUrl}users/byuser/${username}`)
  }
  updateMember(member: Member)
  {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
      const index = this.members.indexOf(member);
      this.members [index] = {... this.members [index], ...member}
      }))
  }
  setMainPhoto(photoId: number)
  {
    return this.http.put(this.baseUrl+'users/setMainPhoto/'+photoId, {})
  }
 deletePhoto(photoId: number)
  {
    return this.http.delete(this.baseUrl+'users/deletephoto/'+photoId, {})
  }
  // getHttpOptions()
  // {
  //   const userString = localStorage.getItem('user')
  //   if(!userString) return;
  //   const user = JSON.parse(userString)
  //   return{
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + user.token
  //     })
  //   }
  // }
}
