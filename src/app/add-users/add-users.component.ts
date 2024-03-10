import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddUsersComponent implements OnInit {
  userForm!: FormGroup;
Email: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
    });

  //   this.userForm.patchValue({
  //  name: 'xxxxzz',
  //  dob:
  //   })
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = {
        fullName: this.userForm.get('fullName')?.value,
        dateOfBirth: this.userForm.get('dateOfBirth')?.value,
        phoneNumber: this.userForm.get('phoneNumber')?.value,
        email: this.userForm.get('email')?.value
      };
      this.userService.createrUsers(userData).subscribe(
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
