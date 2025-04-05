import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroStar,
  heroClock,
  heroBookOpen,
  heroBolt
} from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';
import { NodeDetailsComponent } from '../timeline/node-details/node-details.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgIcon, NodeDetailsComponent],
  providers: [provideIcons({ heroStar, heroClock, heroBookOpen, heroBolt })],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  constructor(private http: HttpClient) {}

  selectedTitle: string = '';
  selectedDescription: string = '';
  showModal: boolean = false;
  lessonsMap: { [key: string]: { title: string; description: string } } = {};

  openModal(item: { title: string; description: string }) {
    this.selectedTitle = item.title;
    this.selectedDescription = item.description;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  ngOnInit(): void {
    this.fetchLessons();
  }

  capitalizeTitle(title: string): string {
    return title
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  titleToId(title: string): string {
    return title
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  fetchLessons(): void {
    const uuid = localStorage.getItem('uuid');
    if (!uuid) {
      console.error('No UUID found. Please log in.');
      return;
    }

    const payload = { uuid };
    const url = 'https://chronoapi.duckdns.org/lesson/IslamicGoldenAge/getall';

    this.http.post<any[]>(url, payload).subscribe(
      (lessons) => {
        const cleanedLessons = lessons
          .filter(lesson => lesson.Title && typeof lesson.Title === 'string')
          .map(lesson => {
            const title = this.capitalizeTitle(lesson.Title);
            const lessonObj = {
              icon: 'heroBookOpen',
              title: title,
              description: lesson.Completed ? 'Completed' : 'Available'
            };
            this.lessonsMap[this.titleToId(title)] = lessonObj;
            return lessonObj;
          });

        const hardcodedLesson = {
          icon: 'heroBookOpen',
          title: 'Islamic Golden Age',
          description: "Al-Khwarizmi’s algebraic methods"
        };
        cleanedLessons.unshift(hardcodedLesson);
        this.lessonsMap[this.titleToId(hardcodedLesson.title)] = hardcodedLesson;

        const allLessonSection = this.sections.find(s => s.title === 'All Lessons');
        if (allLessonSection) {
          allLessonSection.items = cleanedLessons;
        }

        this.fetchFavorites(); // 🔁 Now that lessons are fetched, fetch favorites
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }

  fetchFavorites(): void {
    const uuid = localStorage.getItem('uuid');
    if (!uuid) return;

    const payload = { uuid };

    this.http.post<any>('https://chronoapi.duckdns.org/user/getfavorites', payload).subscribe({
      next: (response) => {
        const favoriteIds: string[] = response.favorites || [];

        const favoriteItems = favoriteIds
          .map(id => this.lessonsMap[id])
          .filter(item => !!item)
          .map(item => ({
            icon: 'heroStar',
            title: item.title,
            description: item.description
          }));

        const favoritesSection = this.sections.find(s => s.title === 'Favorites');
        if (favoritesSection) {
          favoritesSection.items = favoriteItems;
        }
      },
      error: (err) => {
        console.error('Error fetching favorites:', err);
      }
    });
  }
  onFavoriteToggled(): void {
    this.fetchFavorites();
  }
  

  sections = [
    {
      title: 'Next Lessons',
      items: [
        { icon: 'heroBolt', title: 'Introduction to Algebra', description: 'Starts soon' },
        { icon: 'heroBolt', title: 'Zero and its Origins', description: 'Scheduled' }
      ]
    },
    {
      title: 'Favorites',
      items: []
    },
    {
      title: 'Recent',
      items: [
        { icon: 'heroClock', title: 'Archimedes and the Principle of Buoyancy', description: 'Viewed yesterday' },
        { icon: 'heroClock', title: 'Omar Khayyam\'s Geometric Solutions', description: 'Viewed 2 days ago' }
      ]
    },
    {
      title: 'All Lessons',
      items: []
    }
  ];
}
