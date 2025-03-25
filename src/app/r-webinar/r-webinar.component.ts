import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebinarService } from '../services/webinar.service';

@Component({
  selector: 'app-r-webinar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './r-webinar.component.html',
  styleUrls: ['./r-webinar.component.scss'],
})
export class RWebinarComponent {
  webinarData = {
    name: '',
    email: '',
    phone: '',
    webinar_topic: '', // This will hold the selected topics as a string
  };

  webinarTopics: { [key: string]: boolean } = {
    Angular: false,
    React: false,
    Python: false,
  };

  constructor(private webinarService: WebinarService) {}

  onTopicChange() {
    // Combine selected topics into a single string separated by commas
    const selectedTopics = Object.keys(this.webinarTopics)
      .filter((topic) => this.webinarTopics[topic]) // Filter only selected topics
      .join(', ');
    this.webinarData.webinar_topic = selectedTopics;
    console.log('Selected Webinar Topics:', this.webinarData.webinar_topic);
  }

  onSubmit() {
    console.log('Submitting webinarData:', this.webinarData);

    // Validate required fields
    if (!this.webinarData.name || !this.webinarData.email || !this.webinarData.phone || !this.webinarData.webinar_topic) {
      alert('All fields are required. Please fill out the form completely.');
      return;
    }

    this.webinarService.registerWebinar(this.webinarData).subscribe(
      (response) => {
        if (response?.status === 'success') {
          alert('Message sent successfully! Please check your email for further details');

          // Reset form fields
          this.webinarData = {
            name: '',
            email: '',
            phone: '',
            webinar_topic: '',
          };

          // Reset checkboxes
          this.webinarTopics = { Angular: false, React: false, Python: false };
        } else {
          alert(response?.message || 'Failed to send message. Please try again.');
        }
      },
      (error) => {
        console.error('Error submitting form:', error);
        alert('An error occurred while sending your message. Please try again later.');
      }
    );
  }
}
