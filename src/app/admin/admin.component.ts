import { Component, AfterViewInit } from '@angular/core';
import { AdminService } from '../services/admin.service'; // Import Admin Service
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf, *ngFor
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],  // Include CommonModule here
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements AfterViewInit {
  currentSection = 'dashboard';  // Default section
  contactQueries: any[] = [];
  courseEnrollments: any[] = [];
  private chart: Chart | null = null;

  constructor(private adminService: AdminService) {}

  ngAfterViewInit() {
    this.loadDashboardData();
    this.showSection('dashboard');
  }

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
}
