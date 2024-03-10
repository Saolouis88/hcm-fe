import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IUser,
  IUserCreateRequest,
  IUserSearchRequest,
  iUserUpdateRequest,
} from './user.model';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router'; // Thêm đường dẫn đến Router

@Injectable({
  providedIn: 'root',
})
export class UserService {

  paginationService: any;
  getCurrentUser() {
    throw new Error('Method not implemented.');
  }
  private usersUrl = 'https://65d86297c96fbb24c1bb65a5.mockapi.io/users';

  constructor(private httpClient: HttpClient, private router: Router) {
    // Thêm router vào constructor
  }

  createrUsers(user: IUserCreateRequest): Observable<IUser> {
    return this.httpClient.post<IUser>(this.usersUrl, user);
    // .pipe(catchError(this.handleError<IUser>('createrUsers')));
  }
  getUser(userId: number | string): Observable<IUser> {
    const url = `${this.usersUrl}/${userId}`;
    return this.httpClient.get<IUser>(url);
  }

  deleteUserSv(userId: number): Observable<void> {
    const url = `${this.usersUrl}/${userId}`;
    return this.httpClient.delete<void>(url);
    // .pipe(catchError(this.handleError('deleteUser')));
  }

  updateUser(
    userId: number,
    updatedRequest: iUserUpdateRequest
  ): Observable<IUser> {
    const url = `${this.usersUrl}/${userId}`;
    return this.httpClient.put<IUser>(url, updatedRequest);
  }

  SearchUser(searchRequest?: IUserSearchRequest): Observable<IUser[]> {
    let httpParam: HttpParams = new HttpParams();

    // Kiểm tra xem searchRequest có tồn tại không
    if (searchRequest) {
      // Duyệt qua các thuộc tính của searchRequest và append vào HttpParams
      for (const key in searchRequest) {
        if (Object.prototype.hasOwnProperty.call(searchRequest, key)) {
          const value = searchRequest[key as keyof IUserSearchRequest];
          // Nếu giá trị không rỗng thì append vào HttpParams
          if (value) {
            httpParam = httpParam.append(key, value.toString());
          }
        }
      }
    }

    return this.httpClient.get<IUser[]>(
      'https://65d86297c96fbb24c1bb65a5.mockapi.io/users',
      {
        params: httpParam,
      }
    );
  }

  onPageIndexChanged(newPageIndex: number) {
    this.paginationService.onPageIndexChanged.next(newPageIndex);
  }
}
