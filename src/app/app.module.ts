import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserService } from './user.service';
import { BrowserModule } from '@angular/platform-browser';


@NgModule ({
  providers: [UserService],
  imports:[

    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
  ],

  declarations: [],
})
export class AppModule { }

