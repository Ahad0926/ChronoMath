import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor } from '@angular/common';
import { NodeComponent } from './node/node.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NgFor, NodeComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {
  nodes = [
    {
      title: 'Ancient Greece',
      description: 'Euclidean Elements: Foundation of modern geometry.',
      positionX: 100,
      positionY: 150,
      status: 'completed',
      color: 'bg-blue-300',
      icon: 'heroAcademicCap',
    },
    {
      title: 'Islamic Golden Age',
      description: 'Development of Algebra.',
      positionX: 300,
      positionY: 250,
      status: 'in-progress',
      color: 'bg-yellow-300',
      icon: 'heroCalculator',
    },
    {
      title: 'Present Day',
      description: 'Algorithms, cryptography, machine learning.',
      positionX: 500,
      positionY: 350,
      status: 'locked',
      color: 'bg-gray-300',
      icon: 'heroGlobeAlt',
    },
  ];
}
