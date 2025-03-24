import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  // Array of courses
  courses = [
    { title: 'PHP Course', description: 'Learn backend development with PHP', image: 'assets/images/php.jpeg', category: 'backend' },
    { title: 'Angular Course', description: 'Master frontend development with Angular', image: 'assets/images/angular.jpeg', category: 'frontend' },
    { title: 'Django Course', description: 'Learn Django for backend development', image: 'assets/images/django.png', category: 'backend' },
    { title: 'Flutter Course', description: 'Learn Cross Platform App Development', image: 'assets/images/flutter.jpeg', category: 'app' },
    { title: 'Java Course', description: 'Learn Java for backend development', image: 'assets/images/java.png', category: 'backend' },
    { title: 'React Course', description: 'Learn React for frontend development', image: 'assets/images/react.jpeg', category: 'frontend' },
  ];

  filteredCourses = [...this.courses];

  // Handle button click to filter courses
  filterCourses(category: string): void {
    if (category === 'all') {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter(course => course.category === category);
    }
  }
}
