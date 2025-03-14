import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizSidebarComponent } from './quiz-sidebar/quiz-sidebar.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  imports: [CommonModule, NgIf, NgFor, NgClass, QuizSidebarComponent],
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  userAnswers: { [key: string]: string } = {};
  correctAnswers: { [key: string]: string } = {
    q1: 'ax^2+bx+c=0',
    q2: 'Divide by the leading coefficient (if a ≠ 1) and isolate x^2+bx on one side',
    q3: '(x + 2)(x + 4)',
    q4: 'Adding enough to both sides so that the left side becomes a perfect square.',
    q5: 'No real roots, but two complex roots.',
    q6: 'Add the same term to both sides until one side becomes a perfect square and then rearrange to isolate that square.',
    q7: 'Add 16 to both sides to form (x+4)^2=36, then take square roots.'
  };

  showModal = false;
  score = 0;
  incorrectAnswers: any[] = [];

  constructor(private router: Router) {}

  selectAnswer(questionKey: string, answer: string) {
    this.userAnswers[questionKey] = answer;
  }

  submitQuiz() {
    let score = 0;
    const incorrect: any[] = [];

    Object.keys(this.correctAnswers).forEach((key) => {
      if (this.userAnswers[key] === this.correctAnswers[key]) {
        score++;
      } else {
        incorrect.push({
          question: key,
          selected: this.userAnswers[key] || 'No selection',
          correct: this.correctAnswers[key]
        });
      }
    });

    this.score = score;
    this.incorrectAnswers = incorrect;
    this.showModal = true;
  }

  retryQuiz() {
    window.location.reload();
  }

  completeLesson() {
    this.router.navigate(['/timeline']);
  }
}
