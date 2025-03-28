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
  answeredQueries: any[] = []; // Store answered queries
  currentPage: number = 1; // Pagination for queries
  currentEnrollmentPage: number = 1; // Pagination for enrollments
  currentWebinarPage: number = 1;  // Pagination for webinars
  itemsPerPage: number = 8; // 8 items per page (applies to both queries and enrollments)
  successMessage: string = '';  // Success message to show after deletion
  errorMessage: string = '';  // Error message to show after failure
  
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
        this.contactQueries.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      },
      (error) => {
        console.error('Failed to load contact queries', error);
      }
    );
  }

  // Delete Contact Query
  deleteContactQuery(queryId: number) {
    console.log('Deleting Contact Query ID:', queryId); // Ensure ID is passed correctly
    if (queryId) {
      this.adminService.deleteContactQuery(queryId).subscribe(
        (response) => {
         // console.log('Contact query deleted successfully', response);
          // Update the UI or refresh the list after deletion
          this.contactQueries = this.contactQueries.filter(query => query.id !== queryId);
          this.successMessage = 'Contact query deleted successfully';
          this.errorMessage = ''; // Clear any previous errors
        },
        (error) => {
          console.error('Failed to delete contact query', error);
          this.errorMessage = 'Failed to delete contact query';
          this.successMessage = ''; // Clear any previous success message
        }
      );
    } else {
      console.error('Invalid contact query ID');
    }
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

  // Delete Webinar Registration
  deleteWebinarRegistration(registrationId: number) {
   // console.log('Deleting Webinar Registration ID:', registrationId); // Debugging log
    if (confirm('Are you sure you want to delete this webinar registration?')) {
      this.adminService.deleteWebinarRegistration(registrationId).subscribe(
        (response) => {
        //  console.log('Webinar registration deleted successfully', response);
          // Remove the deleted registration from the displayed list immediately
          this.webinars = this.webinars.filter((registration) => registration.id !== registrationId);
          this.successMessage = 'Webinar registration deleted successfully';
          this.errorMessage = ''; // Clear any previous errors
        },
        (error) => {
      // console.error('Failed to delete webinar registration', error);
          this.errorMessage = 'Failed to delete webinar registration';
          this.successMessage = ''; // Clear any previous success message
        }
      );
    }
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

  // Delete Enrollment
  deleteEnrollment(enrollmentId: number) {
  //  console.log('Deleting Enrollment ID:', enrollmentId);  // Log the ID for debugging
    if (enrollmentId) {
      this.adminService.deleteEnrollment(enrollmentId).subscribe(
        (response) => {
        //  console.log('Enrollment deleted successfully', response);
          this.courseEnrollments = this.courseEnrollments.filter(enrollment => enrollment.id !== enrollmentId);
          this.successMessage = 'Enrollment deleted successfully';  // Show success message
          this.errorMessage = '';  // Clear any previous error
        },
        (error) => {
        //  console.error('Failed to delete enrollment', error);
          this.errorMessage = `Error: ${error.status} - ${error.statusText}: ${error.message}`;
          this.successMessage = '';  // Clear success message if error occurs
        }
      );
    } else {
      console.error('Invalid enrollment ID');
    }
  }

  // Send Answered Queries
  sendAnsweredQueries() {
    // Logic to send or mark queries as answered
    this.answeredQueries = [...this.contactQueries]; // Example logic
    this.contactQueries = []; // Clear queries after sending
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
