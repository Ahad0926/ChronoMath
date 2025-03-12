import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor } from '@angular/common';
import { NodeComponent } from './node/node.component';
import panzoom from '@panzoom/panzoom';


@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NgFor, NodeComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent implements AfterViewInit {
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


  @ViewChild('timelineCanvas') timelineCanvas!: ElementRef;
  @ViewChild('timelineParent') timelineParent!: ElementRef;
  panzoomInstance: any;

  ngAfterViewInit() {
    const canvasElem = this.timelineCanvas.nativeElement;
    const parentElem = this.timelineParent.nativeElement;
  
    // Setup panzoom on the canvas with canvas mode enabled
    this.panzoomInstance = panzoom(canvasElem, {
      canvas: true, // ✅ Moves in relation to parent, not window
      maxZoom: 2.5,
      minZoom: 0.5,
      bounds: false, // Optional - disables bounds restricting panning
      zoomDoubleClickSpeed: 1, // Disable zoom on double click
    });
  
    // Bind zoomWithWheel to the parent element
    parentElem.addEventListener('wheel', (event: WheelEvent) => {
      // Directly call zoomWithWheel without shift key requirement
      this.panzoomInstance.zoomWithWheel(event);
    });
  
    // Optional: Disable right-click context menu
    canvasElem.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault();
    });
  }
  
  
}

