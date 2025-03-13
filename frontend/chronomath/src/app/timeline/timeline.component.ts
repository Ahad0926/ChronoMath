import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor } from '@angular/common';
import { NodeComponent } from './node/node.component';
import panzoom from '@panzoom/panzoom';
import { NodeDetailsComponent } from './node-details/node-details.component';


@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NgFor, NodeComponent, NodeDetailsComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent implements AfterViewInit {
  showModal: boolean = false;
  selectedNodeTitle: string = '';
  selectedNodeDescription: string = '';

  openModal(title: string, description: string) {
  this.selectedNodeTitle = title;
  this.selectedNodeDescription = description;
  this.showModal = true;

  // Disable panzoom interaction while modal is open
  if (this.panzoomInstance) {
    this.panzoomInstance.pause(); // Disables panning and zooming
  }
}

closeModal() {
  this.showModal = false;

  // Re-enable panzoom interaction when modal closes
  if (this.panzoomInstance) {
    this.panzoomInstance.resume(); // Enables panning and zooming
  }
}
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

