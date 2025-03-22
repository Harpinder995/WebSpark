import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Ensure it's provided in root
})
export class ContactService {

  private apiUrl = 'http://localhost/websparkback/contacts.php'; // ✅ Correct URL to PHP file

  constructor(private http: HttpClient) {}

  submitForm(contactData: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', contactData.name);
    formData.append('email', contactData.email);
    formData.append('phone', contactData.phone);
    formData.append('message', contactData.message);
    console.log('Sending data:', formData,contactData); // ✅ Debug log

    return this.http.post(this.apiUrl, formData);
    
  }
}
