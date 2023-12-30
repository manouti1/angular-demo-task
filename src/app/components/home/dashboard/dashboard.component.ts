import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { BlogsComponent } from '../blogs/blogs.component';
import { CardDataComponent } from '../card-data/card-data.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [BlogsComponent, CardDataComponent]
})
export class DashboardComponent implements OnInit {
  albums: any[] = [];
  photos: any[] = [];
  todos: any[] = [];
  users: any[] = [];
  recentPhotos: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    forkJoin({
      albums: this.dataService.getAlbums(),
      photos: this.dataService.getPhotos(),
      todos: this.dataService.getTodos(),
      users: this.dataService.getUsers(),
      recentPhotos: this.dataService.getRecentPhotos(4),
    }).subscribe({
      next: (results: any) => {
        this.albums = results.albums;
        this.photos = results.photos;
        this.todos = results.todos;
        this.users = results.users;
        this.recentPhotos = results.recentPhotos;
        this.generateRandomStrings();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  private generateRandomStrings(): void {
    // Generate random strings for each photo
    this.recentPhotos.forEach(photo => {
      photo.randomString = this.generateRandomString(10);
    });
  }

  private generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

}
