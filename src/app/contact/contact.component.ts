import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']  // Fixed "styleUrl" to "styleUrls"
})
export class ContactComponent {
  contactData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(private contactService: ContactService) {}

  onSubmit() {
      if (!this.contactData.name || !this.contactData.email || !this.contactData.phone|| !this.contactData.message) {
    alert('Please fill in all required fields: Name, Email, Phone and Message.');
    return;  // Stop submission
  }
  this.contactService.submitForm(this.contactData).subscribe(
    (response) => {
      alert('Message sent successfully! Please check your email for further details');

      // Reset the form fields after successful submission
      this.contactData = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };
    },
    (error) => {
      console.error('Error submitting form', error);
      alert('Failed to send message');
    }
  );
}
}
