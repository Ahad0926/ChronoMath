import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimelineComponent } from './timeline/timeline.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LessonComponent } from './lesson/lesson.component';
import { AuthGuard } from './auth.guard';
import { RedirectIfLoggedInGuard } from './redirect-if-loggedin.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'timeline', component: TimelineComponent },
    { path: 'login', component:  LoginComponent, canActivate: [RedirectIfLoggedInGuard]},
    { path: 'profile', component: ProfileComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'lesson', component:  LessonComponent}  
];
