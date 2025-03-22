import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EnrollService } from '../services/enroll.service';  // Assuming you have an EnrollService created

@Component({
  selector: 'app-enroll',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './enroll.component.html',
  styleUrl: './enroll.component.scss'
})
export class EnrollComponent {
  enrollData = {
    name: '',
    email: '',
    phone: '',
    course: '',
    duration: '',
    level: '',
    training_type: '',
    source: '',
    notes: ''
  };

  constructor(private enrollService: EnrollService) {}

  onSubmit() {
    this.enrollService.submitEnrollment(this.enrollData).subscribe(
      (response) => {
        alert('Enrollment submitted successfully! Please check your email for further details');
  
        // Reset the form fields after successful submission
       this.enrollData = {
          name: '',
          email: '',
          phone: '',
          course: '',
          duration: '',
          level: '',
          training_type: '',
          source: '',
          notes: ''
        };
      },
      (error) => {
        console.error('Error submitting enrollment form', error);
        alert('Failed to submit enrollment');
      }
    );
  }
}
