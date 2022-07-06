import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import {PaginatedResult} from '../models/pagination';
import { User } from '../models/user';
import { UserParams } from '../models/userParams';
import { AccountService } from './account.service';
import { take } from 'rxjs/operators';
import { getPaginationHeaders, getPaginatedResults } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = []; // will be used to track state
  memberCache = new Map();
  user: User;
  userParams: UserParams;

  constructor(private http: HttpClient, private accountService: AccountService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    })
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    console.log(response);
    if (response) {
      return of(response);
    }
    
    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize)

    // Modify params going to header
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender); // gender is already a string
    params = params.append('orderBy', userParams.orderBy);

    // if (this.members.length > 0) return of(this.members); // caching; returning an observable
    return getPaginatedResults<Member[]>(this.baseUrl + 'users', params, this.http)
    .pipe(map(response => {
      this.memberCache.set(Object.values(userParams).join('-'), response);
      return response;
    }))
  }

  getMember(username: string) {
    // const member = this.members.find(x => x.username === username); // getting member from those stored in service
    // if (member !== undefined) return of(member);
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.username === username);
    if (member) 
    {
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'users/' + username); // if member not found above, make API call
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member); // this method does not return anything, so we find the member in the Members array
        this.members[index] = member;
      })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);
    return getPaginatedResults<Partial<Member[]>>(this.baseUrl + 'likes', params, this.http);
  }


}
