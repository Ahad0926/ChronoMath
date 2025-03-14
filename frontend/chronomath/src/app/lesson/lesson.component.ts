import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent {
  constructor(public themeService: ThemeService) {}
}
