import { AfterViewInit, Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

declare const Polypad: any;

@Component({
  selector: 'app-polypad-test',
  standalone: true,
  templateUrl: './polypad-test.component.html',
})
export class PolypadTestComponent implements AfterViewInit {
  @ViewChild('polypad') polypadContainer!: ElementRef;
  polypadInstance: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
    this.initPolypad();
  }

  initPolypad() {
    if (!this.polypadContainer || !this.polypadContainer.nativeElement) {
      console.error('Polypad container not found!');
      return;
    }
  
    Polypad.create(this.polypadContainer.nativeElement, {
      toolbar: true,
      sidebar: false,
      settings: true,
      gestures: true,
      grid: 'square-grid',
      background: '#fee2e2',
    }).then((instance: any) => {
      this.polypadInstance = instance;
  
      // Define triangle points (draggable)
      this.polypadInstance.add({ name: 'geo', key: '_a', expr: 'point(100,100)' });
      this.polypadInstance.add({ name: 'geo', key: '_b', expr: 'point(200,100)' });
      this.polypadInstance.add({ name: 'geo', key: '_c', expr: 'point(200,200)' });

      // Triangle sides
      this.polypadInstance.add({ name: 'geo', key: '_ab', expr: 'segment(_a,_b)', label: 'c' });
      this.polypadInstance.add({ name: 'geo', key: '_bc', expr: 'segment(_b,_c)', label: 'a' });
      this.polypadInstance.add({ name: 'geo', key: '_ac', expr: 'segment(_a,_c)', label: 'b' });

      // Squares constructed using rotated points
      this.polypadInstance.add({
        name: 'geo',
        expr: 'polygon(_a,_b,_b.rotate(-pi/2,_a),_a.rotate(pi/2,_b))',
        color: '#f97316',
        label: 'c²',
        labelClass: 'black'
      });
      this.polypadInstance.add({
        name: 'geo',
        expr: 'polygon(_b,_c,_c.rotate(-pi/2,_b),_b.rotate(pi/2,_c))',
        color: '#22c55e',
        label: 'a²',
        labelClass: 'black'
      });
      this.polypadInstance.add({
        name: 'geo',
        expr: 'polygon(_a,_c,_c.rotate(pi/2,_a),_a.rotate(-pi/2,_c))',
        color: '#3b82f6',
        label: 'b²',
        labelClass: 'black'
      });

  
      this.polypadInstance.setViewport(4, 4, 0.8);
      this.polypadInstance.setTool('move');
    }).catch((error: any) => {
      console.error('Error initializing Polypad:', error);
    });
  }
  
}  