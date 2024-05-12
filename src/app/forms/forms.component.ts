import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  formData: FormData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
  };

  constructor(private http: HttpClient) { }

  submitForm() {
    const url = 'https://api.web3forms.com/submit';
    const accessKey = '46de082e-09c1-42a3-8012-4e9a17705f75';

    const formData = new FormData();
    formData.append('access_key', accessKey);
    formData.append('fullName', this.formData.fullName);
    formData.append('email', this.formData.email);
    formData.append('phoneNumber', this.formData.phoneNumber);
    formData.append('message', this.formData.message);

    this.http.post(url, formData)
      .subscribe({
        next: response => {
          console.log('Form submission successful:', response);
          // Handle success, maybe show a success message
        },
        error: error => {
          console.error('Form submission failed:', error);
          // Handle error, maybe show an error message
        }
      });
  }
}
