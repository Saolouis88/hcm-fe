import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { IUser } from '../user.model';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  currentUser?: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('idUser');
    // Kiểm tra xem userId có tồn tại và có phải là số hay không
    if (!userId) {
      console.warn('is user not found');
      return;
    }

    this.userForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      dateOfbirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
    });




    // Get current user data and fill the form
    this.userService.getUser(+userId).subscribe((user) => {
      this.currentUser = user;
      this.userForm.patchValue({
        fullName: user.fullName,
        dateOfbirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        email: user.email,
      });
    });
  }

  onSubmit(): void {
    if (this.userForm.valid && this.currentUser?.id !== undefined) {
      const userData: IUser = {
        fullName: this.userForm.get('fullName')?.value,
        dateOfBirth: this.userForm.get('dateOfbirth')?.value,
        phoneNumber: this.userForm.get('phoneNumber')?.value,
        email: this.userForm.get('email')?.value,
        next: function (arg0: never): number {
          throw new Error('Chức năng không được thực hiện.');
        },
        date: undefined,
        dob: undefined,
        phone: undefined,
        name: undefined
      };

      this.userService.updateUser(this.currentUser.id, userData).subscribe(
        (response: any) => {
          console.log('User created successfully:', response);
          this.router.navigate(['/users']);
        },
        function (error: any) {
          console.error('Error creating user:', error);
          // Xử lý lỗi nếu cần
        }
      );
    } else {
      // Hiển thị thông báo lỗi cho người dùng
      alert('Vui lòng kiểm tra lại các trường nhập liệu');
    }
  }
}
