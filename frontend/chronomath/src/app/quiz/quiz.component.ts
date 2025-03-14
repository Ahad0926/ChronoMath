import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Make sure this is imported!

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('QuizComponent loaded!');

    // Call the backend API and console log the quiz data
    this.fetchQuizData();
  }

  fetchQuizData() {
    const uuid = localStorage.getItem('authToken');
    const url = `http://localhost:4769/quiz/IslamicGoldenAge/getall?uuid=${uuid}`;

    console.log(`Sending GET request to: ${url}`);

    this.http.get(url).subscribe({
      next: (response) => {
        console.log('Quiz Data Fetched:', response);
      },
      error: (err) => {
        console.error('Failed to fetch quiz data:', err);
      }
    });
  }
}
