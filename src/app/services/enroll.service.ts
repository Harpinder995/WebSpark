import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Service available globally in the application
})
export class EnrollService {

  private apiUrl = 'http://localhost/websparkback/enroll.php'; // ✅ Endpoint to handle enrollments in your backend

  constructor(private http: HttpClient) {}

  submitEnrollment(enrollData: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', enrollData.name);
    formData.append('email', enrollData.email);
    formData.append('phone', enrollData.phone);
    formData.append('course', enrollData.course);
    formData.append('duration', enrollData.duration);
    formData.append('level', enrollData.level);
    formData.append('training_type', enrollData.training_type);
    formData.append('source', enrollData.source);
    formData.append('notes', enrollData.notes);

    console.log('Sending enrollment data:', formData, enrollData); // ✅ Debugging log to check submitted data

    return this.http.post(this.apiUrl, formData); // Sending form data to the backend
  }
}
