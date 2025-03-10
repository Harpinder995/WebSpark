import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CoursesComponent } from './courses/courses.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"about",component:AboutusComponent},
    {path:"contact",component:ContactComponent},
    {path:"courses",component:CoursesComponent},

];
