import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  // Fetch webinar registrations from get_webinars.php
  getWebinars(): Observable<any[]> {
    return this.http.get<any>(`${this.apiBaseUrl}/get_webinars.php`).pipe(
      map(response => {
        // Ensure data exists and is an array
        return response.data && Array.isArray(response.data) ? response.data : [];
      })
    );
  }

  // Delete a contact query by ID
  deleteContactQuery(queryId: number) {
    const url = `${this.apiBaseUrl}/deletecontacts.php?id=${queryId}`;  // Ensure correct query ID is passed in the URL
    return this.http.delete(url);
  }

  deleteEnrollment(enrollmentId: number): Observable<any> {
    const url = `${this.apiBaseUrl}/delete_enrollment.php?id=${enrollmentId}`; // Send ID as query parameter
    return this.http.delete<any>(url);
  }
  deleteWebinarRegistration(registrationId: number): Observable<any> {
    const url = `${this.apiBaseUrl}/deletewebinar.php?id=${registrationId}`; // Send ID as query parameter
    return this.http.delete<any>(url);
  }
}
