import { PaginationModule } from './../pagination/pagination.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';
import { MenuComponent } from '../menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PaginationModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],

})
export class ListModule { }

