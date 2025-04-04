import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.css']
})
export class NodeDetailsComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() closeModal = new EventEmitter<void>();
  @Output() favoriteToggled = new EventEmitter<void>(); // ✅ NEW


  isFavorited: boolean = false;
  uuid: string | null = null;
  lessonId: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.uuid = localStorage.getItem('uuid');
    this.lessonId = this.title.replace(/\s+/g, '').replace(/\b\w/g, c => c.toUpperCase());

    if (this.uuid && this.lessonId) {
      this.checkIfFavorited();
    }
  }

  onClose() {
    this.closeModal.emit();
  }

  startLesson() {
    this.router.navigate(['/lesson']);
  }

  checkIfFavorited() {
    const uuid = localStorage.getItem('uuid');
    const payload = { uuid };
    console.log(payload);

    this.http.post<any>('http://127.0.0.1:4769/user/getfavorites', payload).subscribe({
      next: (response) => {
        const favorites = response.favorites || [];
        this.isFavorited = favorites.includes(this.lessonId);
      },
      error: (err) => {
        console.error('Failed to check favorites:', err);
      }
    });
  }

  addToFavorites() {
    const uuid = localStorage.getItem('uuid');
    const lessonId = this.title
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  
    const payload = { uuid, lesson_id: lessonId };
  
    const url = this.isFavorited
      ? 'http://127.0.0.1:4769/user/deletefavorite'
      : 'http://127.0.0.1:4769/user/addfavorite';
  
    this.http.post<any>(url, payload).subscribe({
      next: () => {
        this.isFavorited = !this.isFavorited;
        this.favoriteToggled.emit(); // ✅ tell sidebar to update
      },
      error: (err) => console.error('Failed to toggle favorite:', err)
    });
  }
  
}
