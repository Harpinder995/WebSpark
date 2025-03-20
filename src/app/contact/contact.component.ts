import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.contactForm.valid) {
      const formData = new FormData();
      formData.append('name', this.contactForm.get('name')?.value);
      formData.append('email', this.contactForm.get('email')?.value);
      formData.append('phone', this.contactForm.get('phone')?.value);
      formData.append('message', this.contactForm.get('message')?.value);

      // Call the service to submit the form data to PHP backend
      this.contactService.submitContactForm(formData).subscribe(response => {
        if (response.status === 'success') {
          alert('Form submitted successfully!');
          this.contactForm.reset();
        } else {
          alert('Failed to submit the form');
        }
      }, error => {
        console.error('Error:', error);
        alert('There was an error submitting the form');
      });
    } else {
      alert('Please fill in all required fields');
    }
  }
}
