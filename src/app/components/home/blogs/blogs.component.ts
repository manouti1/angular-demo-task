import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatGridListModule]
})
export class BlogsComponent {
  @Input() photos: any[] = [];
}
