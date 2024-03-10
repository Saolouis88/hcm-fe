import { PaginationComponent } from './../pagination/pagination.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IUser, IUserSearchRequest } from '../user.model';
import { MenuComponent } from '../menu/menu.component';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PaginationModule } from '../pagination/pagination.module';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [
    MenuComponent,
    PaginationModule,
    DatePipe,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [UserService, PaginationComponent],
})
export class ListComponent implements OnInit {
  users: IUser[] = [];
  searchName: string = ''; // Thuộc tính để lưu trữ tên người dùng được tìm kiếm
  searchForm!: FormGroup;

  constructor(
    private _http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.searchForm = new FormGroup({
      searchName: new FormControl(''),
      pageSize: new FormControl(10),
      pageIndex: new FormControl(1),
    });
  }
  ngOnInit() {
    this.onSearch();
  }

  onSearch() {
    const searchRequest: IUserSearchRequest = {
      

    };
    this.userService.SearchUser(searchRequest).subscribe({
      next: (res): void => {
        // Xử lý kết quả tìm kiếm ở đây
        console.log('response data',res);
        this.users=[];

      },
      error: () => {
        this.users=[];
      },
    });
  }
  deleteUser(user: IUser): void {
    // Gọi phương thức xóa người dùng từ service
    this.userService.deleteUserSv(user.id!).subscribe({
      next: (res) => {
        console.log('User deleted successfully.');
        this.onSearch(); // Cập nhật danh sách người dùng sau khi xóa
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      },
    });
  }

  createrUsers(): void {
    this.router.navigate(['/add-users']);
  }

  fixUsers(user: IUser): void {
    // Thêm tham số user: IUser
    this.router.navigate([`/edit-users/${user.id}`]); // Sửa thành user.id
  }
  onPageIndexChange(newPageIndex: number): void {
    // this.onPageIndexChange.emit(newPageIndex);
  }
}
