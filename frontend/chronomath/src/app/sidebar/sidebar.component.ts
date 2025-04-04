import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroStar,
  heroClock,
  heroBookOpen,
  heroBolt
} from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroStar, heroClock, heroBookOpen, heroBolt })],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
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
      items: [
        { icon: 'heroStar', title: 'Ancient Egypt', description: '20% Complete' },
        { icon: 'heroStar', title: 'The Pythagorean Theorem', description: '35% Complete' }
      ]
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
      items: [
        { icon: 'heroBookOpen', title: 'Fibonacci Sequence', description: 'Available' },
        { icon: 'heroBookOpen', title: 'Cryptography and Prime Numbers', description: 'Available' },
        { icon: 'heroBookOpen', title: 'Euler\'s Identity', description: 'Available' }
      ]
    }
  ];
}
