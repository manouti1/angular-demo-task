import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataService } from '../../../services/data.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'avatar',
    'name',
    'username',
    'email',
    'phone',
    'company.name',
  ];
  private pageChange$ = new Subject<{ pageIndex: number; pageSize: number }>();
  private destroy$ = new Subject<void>();
  listItems: any[];
  loading = false;
  view: 'table' | 'list' = 'table'; // Initial view is the table

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.paginator) {
      this.paginator.page
        .pipe(debounceTime(300), takeUntil(this.destroy$))
        .subscribe(() => {
          this.loadData(this.paginator.pageIndex, this.paginator.pageSize);
          if (this.cdr) {
            this.cdr.detectChanges();
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(pageIndex: number, pageSize: number) {
    this.loading = true;

    this.dataService.getPaginatedUsers(pageIndex + 1, pageSize).subscribe(
      (users) => {
        this.listItems = users;
        this.dataSource.data = users;

        // Update the paginator length
        this.paginator.length = users.length;

        // Update the paginator properties only if the view is 'table'
        if (this.view === 'table') {
          this.paginator.pageSize = 10;
          this.paginator.pageIndex = 0;
        }
      },
      (error) => console.error('Error loading data:', error),
      () => (this.loading = false)
    );
  }

  onPageChange(event: any) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    // Emit the page change event through the subject
    this.pageChange$.next({ pageIndex, pageSize });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;

      // Set initial values for pageIndex and pageSize
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = this.view === 'table' ? 10 : 5;

      this.paginator.page
        .pipe(debounceTime(300), takeUntil(this.destroy$))
        .subscribe(() => {
          this.loadData(this.paginator.pageIndex, this.paginator.pageSize);
          if (this.cdr) {
            this.cdr.detectChanges();
          }
        });

      // Load initial data based on the view
      this.loadData(this.paginator.pageIndex, this.paginator.pageSize);
    }
  }

  toggleView(newView: 'table' | 'list') {
    this.view = newView;

    // Check if paginator is defined before setting properties
    if (this.paginator) {
      this.loadData(this.paginator.pageIndex, this.paginator.pageSize);

      // Manually trigger change detection
      if (this.cdr) {
        this.cdr.detectChanges();
      }
    }
  }
}
