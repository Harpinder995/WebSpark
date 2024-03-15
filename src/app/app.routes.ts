import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"about",component:AboutusComponent}
];
