import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"about",component:AboutusComponent},
    {path:"portfolio",component:PortfolioComponent}
];
