import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../Models/member';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../Models/pagination';
import {UserParams} from '../Models/userParams'
@Injectable({
  providedIn: 'root'
})
export class MembersService {

  members : Member[] = []
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  getMembers(userParam: UserParams)
  {

     let params = this.getPaginationHeader(userParam.pageNumber, userParam.pageSize);
      // if (this.members.length > 0) return of (this.members);
     params = params.append('minAge', userParam.minAge)
     params = params.append('maxAge', userParam.maxAge)
     params = params.append('gender', userParam.gender)
     params = params.append('orderBy', userParam.orderBy)

      return this.getPaginationResult<Member[]>(this.baseUrl + 'users',params)
   // return this.http.get<Member[]>(this.baseUrl + 'users')
  }

  private getPaginationResult<T>(url: string, params: HttpParams) {
   const paginationResult : PaginatedResult<Member[]> = new PaginatedResult<Member[]>

    return this.http.get<Member[]>(url, { observe: 'response', params }).pipe(
      // map(members => {
      // this.members = members;
      // return members;
      // })
      map(response => {
        if (response.body) {
          paginationResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginationResult.pagination = JSON.parse(pagination);
        }
        return paginationResult;
      })
    );
  }

  private getPaginationHeader(pageNumber: number, pageSize: number) {
    let params = new HttpParams()
   
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    
    return params;
  }


  addLike(username: string){
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }
getLikes(predicate: string, pageNumber: number, pageSize: number){

  let params = this.getPaginationHeader(pageNumber, pageSize)

  params = params.append('predicate', predicate)

  return this.getPaginationResult<Member[]>(this.baseUrl+ 'likes', params)
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
