import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost/websparkback/contact.php';  // PHP URL

  constructor(private http: HttpClient) {}

  // Method to submit the form data to the PHP backend
  submitContactForm(formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
