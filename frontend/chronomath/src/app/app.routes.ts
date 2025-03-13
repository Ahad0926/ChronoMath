import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimelineComponent } from './timeline/timeline.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LessonComponent } from './lesson/lesson.component';
import { AuthGuard } from './auth.guard';
import { RedirectIfLoggedInGuard } from './redirect-if-loggedin.guard';
import { QuizComponent } from './quiz/quiz.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'timeline', component: TimelineComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'lesson', component: LessonComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [RedirectIfLoggedInGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [RedirectIfLoggedInGuard] },
    { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard]},

  ];
  
