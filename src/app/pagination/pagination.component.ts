import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() total?: number;
  @Input() pageSize?: number;
  @Input() pageIndex?: number;
  @Output() onPageIndexChanged: EventEmitter<number> = new EventEmitter<number>();

  pageItems: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const total = changes['total'] ? changes['total'].currentValue : 0;
    const pageSize = changes['pageSize'] ? changes['pageSize'].currentValue : 0;
    const pageIndex = changes['pageIndex'] ? changes['pageIndex'].currentValue : 0;

    // Tính toán số lượng trang và cập nhật danh sách trang
    this.updatePageItems({ total, pageSize });
  }

  private updatePageItems({ total, pageSize }: { total: number; pageSize: number; }): void {
    const pageCount = Math.ceil(total / pageSize);
    this.pageItems = Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  previousPage() {
    if (this.pageIndex && this.pageIndex > 1) {
      this.onPageIndexChanged.emit(this.pageIndex - 1);
    }
  }

  nextPage() {
    if (this.pageIndex && this.pageIndex < this.pageItems.length) {
      this.onPageIndexChanged.emit(this.pageIndex + 1);
    }
  }

  goToPage(pageNumber: number) {
    if (pageNumber !== this.pageIndex) {
      this.onPageIndexChanged.emit(pageNumber);
    }
  }


}
