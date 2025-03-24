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
    { title: 'PHP Course', description: 'Learn backend development with PHP', image: 'assets/images/php.png', category: 'backend' },
    { title: 'Angular Course', description: 'Master frontend development with Angular', image: 'assets/images/angular.png', category: 'frontend' },
    { title: 'Django Course', description: 'Learn Django for backend development', image: 'assets/images/django.png', category: 'backend' },
    { title: 'Flutter Course', description: 'Learn Cross Platform App Development', image: 'assets/images/flutter.jpg', category: 'app' },
    { title: 'Java Course', description: 'Learn Java for backend development', image: 'assets/images/java.png', category: 'backend' },
    { title: 'React Course', description: 'Learn React for frontend development', image: 'assets/images/react.jpeg', category: 'frontend' },
  
    // New Courses categorized under 'others' or specific ones
    { title: 'Digital Marketing Course', description: 'Master SEO, social media growth, and online advertising techniques', image: 'assets/images/dmarketing.png', category: 'marketing' },
    { title: 'Data Science & AI Course', description: 'Learn data analysis, AI, and machine learning to work on future technologies', image: 'assets/images/dataai.webp', category: 'others' },
    { title: 'Graphic Design Course', description: 'Design creative content, logos, and illustrations using popular design tools', image: 'assets/images/graphic.jpg', category: 'others' },
    { title: 'Video Editing & 3D Animation Course', description: 'Create professional video content and animations for media and gaming', image: 'assets/images/video.jpg', category: 'others' },
    { title: 'Web Development Course', description: 'Build modern websites & web apps with frontend & backend technologies', image: 'assets/images/webfull.png', category: 'frontend' },
    { title: 'App Development Course', description: 'Develop cross-platform apps for Android, iOS, and more', image: 'assets/images/appfull.jpg', category: 'app' },
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
