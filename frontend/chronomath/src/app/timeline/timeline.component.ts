import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import panzoom from '@panzoom/panzoom';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NodeComponent } from './node/node.component';
import { NodeDetailsComponent } from './node-details/node-details.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgFor, NgIf, SidebarComponent, NodeComponent, NodeDetailsComponent],
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
    if (this.panzoomInstance) this.panzoomInstance.pause();
  }

  closeModal() {
    this.showModal = false;
    if (this.panzoomInstance) this.panzoomInstance.resume();
  }

  nodes = [
    // Parents (above Islamic Golden Age)
    {
      id: 'egypt',
      title: 'Ancient Egypt (3000 BCE)',
      description: 'Basic geometry for land measurement and pyramids.',
      positionX: 400, positionY: 100,
      color: 'bg-blue-300', icon: 'heroLandmark'
    },
    {
      id: 'greece',
      title: 'Ancient Greece (300 BCE)',
      description: 'Euclid’s Elements: Foundation of modern geometry.',
      positionX: 600, positionY: 100,
      color: 'bg-blue-300', icon: 'heroScale'
    },
  
    // Center Node
    {
      id: 'islamic',
      title: 'Islamic Golden Age',
      description: 'Al-Khwarizmi’s algebraic methods.',
      positionX: 500, positionY: 300, // Centered
      color: 'bg-yellow-300', icon: 'heroCalculator'
    },
  
    // Children (below Islamic Golden Age)
    {
      id: 'pythagorean',
      title: 'The Pythagorean Theorem',
      description: 'Proof and applications in triangles.',
      positionX: 400, positionY: 500,
      color: 'bg-yellow-300', icon: 'heroPythagoras'
    },
    {
      id: 'descartes',
      title: 'Renaissance Europe (1600 CE)',
      description: 'Descartes invents Analytical Geometry.',
      positionX: 600, positionY: 500,
      color: 'bg-blue-300', icon: 'heroPenTool'
    }
  ];
  

  connections = [
    { from: 'egypt', to: 'islamic' },
    { from: 'greece', to: 'islamic' },
    { from: 'islamic', to: 'pythagorean' },
    { from: 'islamic', to: 'descartes' }
  ];
  

  @ViewChild('timelineCanvas') timelineCanvas!: ElementRef;
  @ViewChild('timelineParent') timelineParent!: ElementRef;
  panzoomInstance: any;

  ngAfterViewInit() {
    const canvasElem = this.timelineCanvas.nativeElement;
    const parentElem = this.timelineParent.nativeElement;
  
    this.panzoomInstance = panzoom(canvasElem, {
      canvas: true,
      minScale: 0.9,       // Zoom out limit
      maxScale: 1.2,       // Zoom in limit
      zoomDoubleClickSpeed: 1,
      bounds: false
    });
  
    parentElem.addEventListener('wheel', (event: WheelEvent) => {
      this.panzoomInstance.zoomWithWheel(event);
    });
  
    canvasElem.addEventListener('contextmenu', (e: MouseEvent) => e.preventDefault());
  }
  

  getNodeCenterX(id: string): number {
    const node = this.nodes.find(n => n.id === id);
    return node ? node.positionX + 96 : 0; // Half width
  }

  getNodeCenterY(id: string): number {
    const node = this.nodes.find(n => n.id === id);
    return node ? node.positionY + 48 : 0; // Half height
  }
}
