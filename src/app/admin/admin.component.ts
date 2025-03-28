import { Component, AfterViewInit } from '@angular/core';
import { AdminService } from '../services/admin.service'; // Import Admin Service
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf, *ngFor

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule], // Include CommonModule here
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements AfterViewInit {
  currentSection = 'dashboard'; // Default section
  contactQueries: any[] = [];
  courseEnrollments: any[] = [];
  webinars: any[] = [];  // Declare webinars array
  currentPage: number = 1; // Pagination for queries
  currentEnrollmentPage: number = 1; // Pagination for enrollments
  currentWebinarPage: number = 1;  // Pagination for webinars
  itemsPerPage: number = 8; // 8 items per page (applies to both queries and enrollments)
  
  constructor(private adminService: AdminService) {}

  ngAfterViewInit() {
    this.loadDashboardData();
    this.showSection('dashboard');
  }

  // Load Contact Queries
  loadContactQueries() {
    this.adminService.getContactQueries().subscribe(
      (data) => {
        this.contactQueries = data;
        // Sort contact queries to show latest first
        this.contactQueries.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      },
      (error) => {
        console.error('Failed to load contact queries', error);
      }
    );
  }

  // Load Course Enrollments
  loadCourseEnrollments() {
    this.adminService.getCourseEnrollments().subscribe(
      (data) => {
        this.courseEnrollments = data;
        // Sort course enrollments to show latest first
        this.courseEnrollments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      },
      (error) => {
        console.error('Failed to load course enrollments', error);
      }
    );
  }

  // Load Webinar Registrations
  loadWebinars() {
    this.adminService.getWebinars().subscribe(
      (data) => {
        this.webinars = data;  // This should now work correctly
        // Sort webinars to show latest first
        this.webinars.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      },
      (error) => {
        console.error('Failed to load webinars', error);
      }
    );
  }

  // Load Dashboard Data
  loadDashboardData() {
    this.adminService.getDashboardData().subscribe(
      (data) => {
        // Handle dashboard data here
      },
      (error) => {
        console.error('Failed to load dashboard data', error);
      }
    );
  }

  // Change the visible section (dashboard, queries, enrollments, webinars)
  showSection(section: string) {
    this.currentSection = section;
    if (section === 'queries') {
      this.loadContactQueries();
    } else if (section === 'enrollments') {
      this.loadCourseEnrollments();
    } else if (section === 'webinars') {
      this.loadWebinars();  // Load webinars when section is 'webinars'
    } else if (section === 'dashboard') {
      this.loadDashboardData();
    }
  }

  // Pagination logic for Queries
  get totalPages(): number {
    return Math.ceil(this.contactQueries.length / this.itemsPerPage);
  }

  paginatedQueries(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.contactQueries.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Pagination logic for Enrollments
  get totalEnrollmentPages(): number {
    return Math.ceil(this.courseEnrollments.length / this.itemsPerPage);
  }

  paginatedEnrollments(): any[] {
    const startIndex = (this.currentEnrollmentPage - 1) * this.itemsPerPage;
    return this.courseEnrollments.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextEnrollmentPage() {
    if (this.currentEnrollmentPage < this.totalEnrollmentPages) {
      this.currentEnrollmentPage++;
    }
  }

  prevEnrollmentPage() {
    if (this.currentEnrollmentPage > 1) {
      this.currentEnrollmentPage--;
    }
  }

  // Pagination logic for Webinars
  get totalWebinarPages(): number {
    return Math.ceil(this.webinars.length / this.itemsPerPage);
  }

  paginatedWebinars(): any[] {
    const startIndex = (this.currentWebinarPage - 1) * this.itemsPerPage;
    return this.webinars.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextWebinarPage() {
    if (this.currentWebinarPage < this.totalWebinarPages) {
      this.currentWebinarPage++;
    }
  }

  prevWebinarPage() {
    if (this.currentWebinarPage > 1) {
      this.currentWebinarPage--;
    }
  }
}
