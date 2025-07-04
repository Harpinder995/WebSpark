import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CoursesComponent } from './courses/courses.component';
import { ContactComponent } from './contact/contact.component';
import { EnrollComponent } from './enroll/enroll.component';
import { AdminComponent } from './admin/admin.component';
import { RWebinarComponent } from './r-webinar/r-webinar.component';
import { FeesComponent } from './fees/fees.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"about",component:AboutusComponent},
    {path:"contact",component:ContactComponent},
    {path:"courses",component:CoursesComponent},
    {path:"enroll",component:EnrollComponent},
    {path:"admin",component:AdminComponent},
     {path:"fees",component:FeesComponent},
    {path:"rwebinar",component:RWebinarComponent},


];
