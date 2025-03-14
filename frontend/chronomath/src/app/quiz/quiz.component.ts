import { Component, OnInit } from '@angular/core';
import { QuizSidebarComponent } from './quiz-sidebar/quiz-sidebar.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  imports: [QuizSidebarComponent],
  styleUrls: ['./quiz.component.css'] // Optional with Tailwind
})
export class QuizComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    console.log('Quiz page loaded');
  }

}
