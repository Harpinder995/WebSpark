import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [FooterComponent,MatIconModule, RouterLink]
})
export class HomeComponent {

}
