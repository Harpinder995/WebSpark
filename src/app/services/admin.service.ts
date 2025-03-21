import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiBaseUrl = 'http://localhost/websparkback/api';  // New API folder base URL

  constructor(private http: HttpClient) {}

  // Fetch contact queries from get_contacts.php
  getContactQueries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/get_contacts.php`);
  }

  // Fetch course enrollments from get_enrollments.php
  getCourseEnrollments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/get_enrollments.php`);
  }

  // Fetch dashboard data from get_dashboard_data.php
  getDashboardData(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/get_dashboard_data.php`);
  }
}
