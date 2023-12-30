import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatGridListModule]
})
export class CardDataComponent {
  @Input() albums: any[] = [];
  @Input() todos: any[] = [];
  @Input() photos: any[] = [];
  @Input() users: any[] = [];
}
