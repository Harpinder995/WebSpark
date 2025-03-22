import { Component, AfterViewInit } from '@angular/core';
import { AdminService } from '../services/admin.service'; // Import Admin Service
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf, *ngFor
import Chart from 'chart.js/auto';

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
  currentPage: number = 1; // Pagination for queries
  currentEnrollmentPage: number = 1; // Pagination for enrollments
  itemsPerPage: number = 8; // 8 items per page (applies to both queries and enrollments)
  private chart: Chart | null = null;

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
      },
      (error) => {
        console.error('Failed to load course enrollments', error);
      }
    );
  }

  // Load Dashboard Data
  loadDashboardData() {
    this.adminService.getDashboardData().subscribe(
      (data) => {
        const chartData = [data.totalEnrollments, data.totalQueries];
        this.createChart(chartData);
      },
      (error) => {
        console.error('Failed to load dashboard data', error);
      }
    );
  }

  // Change the visible section (dashboard, queries, enrollments)
  showSection(section: string) {
    this.currentSection = section;
    if (section === 'queries') {
      this.loadContactQueries();
    } else if (section === 'enrollments') {
      this.loadCourseEnrollments();
    } else if (section === 'dashboard') {
      setTimeout(() => this.loadDashboardData(), 0);
    }
  }

  // Create Dashboard Chart
  private createChart(chartData: number[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('enrollmentChart') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Enrollments', 'Queries'],
          datasets: [
            {
              label: 'Dashboard Stats',
              data: chartData,
              backgroundColor: ['#007bff', '#28a745'],
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
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
}
