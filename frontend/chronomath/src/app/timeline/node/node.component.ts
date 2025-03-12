import { Component, Input } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroAcademicCap, heroCalculator, heroGlobeAlt } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-node',
  standalone: true,
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css'],
  imports: [CommonModule, NgClass, NgStyle, NgIcon],
  providers: [provideIcons({ heroAcademicCap, heroCalculator, heroGlobeAlt })],
})
export class NodeComponent {
  @Input() title: string = 'Node Title';
  @Input() description: string = '';
  @Input() positionX: number = 0;
  @Input() positionY: number = 0;
  @Input() status: String = 'locked';
  @Input() color: string = 'bg-yellow-300'; // Default color
  @Input() icon: string = 'heroAcademicCap'; // Default icon

  get nodeClasses(): string {
    return `${this.color} text-black border-2 rounded-lg px-4 py-2 shadow-lg`;
  }

  get positionStyle(): object {
    return {
      transform: `translate(${this.positionX}px, ${this.positionY}px)`,
    };
  }
}
