import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebinarService {
  private apiUrl = 'http://localhost/websparkback/webinars.php';

  constructor(private http: HttpClient) {}

  registerWebinar(webinarData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, webinarData, {
      headers: {
        'Content-Type': 'application/json'  // Sending JSON format
      }
    });
  }
}
