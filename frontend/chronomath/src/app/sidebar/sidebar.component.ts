import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroStar, heroClock, heroBookOpen, heroCheckCircle } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgIcon], // Import NgIcon for standalone components
  providers: [provideIcons({ heroStar, heroClock, heroBookOpen, heroCheckCircle })], // Register icons
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sections = [
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
        { icon: 'heroClock', title: 'Archimedes and the Principle of Buoyancy', description: 'Description' },
        { icon: 'heroClock', title: 'Omar Khayyam\'s Geometric Solutions', description: 'Description' }
      ]
    },
    {
      title: 'All Lessons',
      items: [
        { icon: 'heroBookOpen', title: 'Fibonacci Sequence', description: 'Description' },
        { icon: 'heroBookOpen', title: 'Cryptography and Prime Numbers', description: 'Description' },
        { icon: 'heroBookOpen', title: 'Euler\'s Identity', description: 'Description' }
      ]
    },
    {
      title: 'Completed',
      items: [
        { icon: 'heroCheckCircle', title: 'Gödel\'s Incompleteness Theorems', description: 'Description' },
        { icon: 'heroCheckCircle', title: 'Fourier Transforms', description: 'Description' }
      ]
    }
  ];
}
