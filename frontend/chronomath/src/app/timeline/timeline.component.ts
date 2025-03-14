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
    title: 'Ancient Egypt (3000 BCE)',
    description: 'Introduction of basic geometry used for land measurement and pyramid construction.',
    positionX: 100,
    positionY: 400,
    status: 'complete',
    color: 'bg-blue-300',
    icon: 'heroLandmark',
  },
  {
    title: 'Ancient Greece (300 BCE)',
    description: 'Euclid’s Elements: Foundation of modern geometry.',
    positionX: 500,
    positionY: 100,
    status: 'complete',
    color: 'bg-blue-300',
    icon: 'heroScale',
  },
  {
    title: 'The Pythagorean Theorem',
    description: 'Exploring Pythagorean proof and applications in right-angled triangles.',
    positionX: 900,
    positionY: 300,
    status: 'complete',
    color: 'bg-yellow-300',
    icon: 'heroPythagoras',
  },
  {
    title: 'Islamic Golden Age',
    description: 'Al-Khwarizmi’s work introduces systematic solutions of linear and quadratic equations.',
    positionX: 700,
    positionY: 700,
    status: 'in-progress',
    color: 'bg-yellow-300',
    icon: 'heroCalculator',
  },
  {
    title: 'Renaissance Europe (1600 CE)',
    description: 'René Descartes bridges algebra and geometry, inventing Analytical Geometry.',
    positionX: 1200,
    positionY: 500,
    status: 'locked',
    color: 'bg-blue-300',
    icon: 'heroPenTool',
  },
  {
    title: '18th Century Calculus',
    description: 'Newton and Leibniz formalize the principles of differential and integral calculus.',
    positionX: 1500,
    positionY: 800,
    status: 'locked',
    color: 'bg-yellow-300',
    icon: 'heroFunction',
  },
  {
    title: 'Euler’s Identity',
    description: 'Connecting fundamental constants in a single elegant equation.',
    positionX: 1300,
    positionY: 1100,
    status: 'locked',
    color: 'bg-yellow-300',
    icon: 'heroSparkles',
  },
  {
    title: 'Gödel’s Incompleteness Theorems',
    description: 'Limits of formal systems in mathematics.',
    positionX: 800,
    positionY: 1200,
    status: 'locked',
    color: 'bg-yellow-300',
    icon: 'heroExclamation',
  },
  {
    title: 'Present Day',
    description: 'Algorithms, cryptography, and machine learning innovations.',
    positionX: 400,
    positionY: 1000,
    status: 'locked',
    color: 'bg-blue-300',
    icon: 'heroCpu',
  },
  {
    title: 'The Birth of Game Theory',
    description: 'Von Neumann’s strategic decision-making models.',
    positionX: 1100,
    positionY: 1400,
    status: 'locked',
    color: 'bg-yellow-300',
    icon: 'heroPresentationChart',
  }
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

