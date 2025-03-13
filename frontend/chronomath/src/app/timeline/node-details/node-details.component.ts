import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ Import router

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.css']
})
export class NodeDetailsComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() closeModal = new EventEmitter<void>();

  constructor(private router: Router) {} // ✅ Inject router

  onClose() {
    this.closeModal.emit();
  }

  startLesson() {
    // Static route for now
    this.router.navigate(['/lesson']);
  }
}
