import { CommonModule } from '@angular/common'; // hoặc BrowserModule
import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination.component';
// Import các component và module khác

@NgModule({
  declarations: [
    PaginationComponent
    // Khai báo các component
  ],
  imports: [
    
    CommonModule,// hoặc BrowserModule
    // Import các module khác
  ],
  exports: [PaginationComponent
  ],
  providers: [],
  bootstrap: [],
})
export class PaginationModule { }
