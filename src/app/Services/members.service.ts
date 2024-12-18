import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../Models/member';
import { map, of } from 'rxjs';
import { PaginatedResult } from '../Models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  members : Member[] = []
  baseUrl = environment.baseUrl
  paginationResult : PaginatedResult<Member[]> = new PaginatedResult<Member[]>

  constructor(private http: HttpClient) { }

  getMembers(page?: number, itemsPerPage?: number)
  {
    let params = new HttpParams()

    if(page && itemsPerPage)
    {
       params = params.append('pageNumber', page)
       params = params.append('pageSize', itemsPerPage)
    }
      // if (this.members.length > 0) return of (this.members);

      return this.http.get<Member[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
      // map(members => {
      // this.members = members;
      // return members;
      // })
      map(response => {
        if(response.body){
          this.paginationResult.result = response.body
        }
        const pagination = response.headers.get('Pagination')
        if(pagination){
          this.paginationResult.pagination = JSON.parse(pagination)
        }
        return this.paginationResult
      })
    )
   // return this.http.get<Member[]>(this.baseUrl + 'users')
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
