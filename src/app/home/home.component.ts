import { Component, Renderer2, ElementRef, HostListener, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PortfolioServiceService } from '../portfolio-service.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  textColor: string = '#2461FF';
  bgColor: string = '#FFFFFF';
  colorPickerFormHome!: FormGroup;
  isColorPicker = false;
  isTogglingNavbar = false;
  isNavbarCollapsed = true;
  activeSection: string = 'home';

  formData: FormData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
  };
  formSuccess: boolean = false;
  showFormStatus: boolean = false;

  showContactForm: boolean = false; // Flag to toggle between initial content and form

  // Include your contact information
  phoneNumber: string = "+91 8555851483";
  emailId: string = "birjiskhatoon213@gmail.com";

  skills: string[] = [
    "Angular", "HTML", "CSS", "TypeScript", "Bootstrap", "Responsive Design", "Git", "API Integration", "Debugging", "Testing",
    "SQL", "NVDA", "Postman", "Swagger", "Figma (basics)", "Katalon (basics)"
  ];

  experience: string[] = [
    "Developed UI screens for <strong>three applications:</strong> <br>- <strong>Employee office hours tracking and rostering application.</strong> <br>- <strong>Seat allocation application based on group and employee.</strong> <br>- <strong>Room booking application for employees in selected places.</strong>",
    "Utilized <strong>Angular, HTML, CSS, and TypeScript</strong> for frontend development across all applications.",
    "Integrated <strong>REST APIs</strong> for fetching and updating data within each application.",
    "Implemented <strong>responsive design principles</strong> for optimal user experience.",
    "<strong>Collaborated with backend teams</strong> for seamless integration of frontend and backend functionalities.",
    "<strong>Utilized Angular components, services, and directives</strong> for dynamic user interfaces in all applications.",
    "Ensured <strong>accessibility</strong> across devices, considering diverse user needs and implementing best practice.",
    "Worked on <strong>role management implementation</strong> to ensure proper access control and security measures in each application.",
    "Engaged in <strong>design discussions</strong> to align UI/UX with project goals and user requirements across all projects.",
    "Provided <strong>support</strong> for all three projects, resolving tickets and addressing user queries promptly to ensure smooth operation of the applications."
  ];

  projects: any[] = [
    {
      title: 'Convertors',
      description: "Convertors is a user-friendly website offering a wide range of conversion tools for various needs. From web development to color conversions, temperature, time, currency, and more, it provides simple and efficient solutions. With a clean interface and responsive design, Convertors makes it easy to convert different units quickly and accurately. Built with Angular and Bootstrap, it's your go-to destination for all your conversion tasks.",
      projectLink: 'home/projects/convertors'
    },
    {
      title: 'Medico',
      description: 'Medico is a healthcare website designed to provide users with easy access to medical services, information, and appointments. It offers a range of features including booking appointments, accessing clinical results, and learning about various medical practices. Technologies used in the development of Medica include Angular for frontend development, Bootstrap for responsive design and styling, HTML/CSS for structuring and styling the website, and TypeScript for implementing interactive features and functionality.',
      projectLink: 'home/projects/medico'
    },
    {
      title: 'Gaze',
      description: 'Gaze is a minimalist web application that showcases images in a Pinterest-style layout, offering users an immersive visual experience. Utilizing the Masonry layout, Gaze presents a curated collection of images without any distractions, allowing users to focus solely on the visuals. Its clean interface and intuitive design ensure a seamless browsing experience for image viewing and discovery.',
      projectLink: 'home/projects/gaze'
    },
    {
      title: 'Crown Template',
      description: 'Crown is a web template that I created targeting the restaurant and food industry, which anyone can use to present their business online.',
      projectLink: 'home/projects/forms'
    }
  ];

  downloads: any[] = [
    {
      title: 'Portfolio',
      description: 'Download my portfolio to explore a collection of my latest projects and web development work. The portfolio showcases websites and web applications I have built, providing insights into my skills and design aesthetic.',
      buttonText: 'Download Portfolio',
      fileUrl: 'assets/downloads/portfolio.pdf'
    },
    {
      title: 'Resume',
      description: 'Get my latest resume to learn more about my professional background, education, and work experience. The resume highlights key achievements, skills, and technologies I am proficient in, making it easier for you to understand my qualifications.',
      buttonText: 'Download Resume',
      fileUrl: 'assets/downloads/Birjis Khatoon Resume.pdf'
    },
    {
      title: 'Cover Letter',
      description: 'Read my cover letter to gain insights into my motivation, passion for web development, and a summary of what makes me stand out. The cover letter provides a personal touch, giving you a glimpse into my journey as a frontend web developer.',
      buttonText: 'Download Cover Letter',
      fileUrl: 'assets/downloads/cover-letter.pdf'
    },
    {
      title: 'Project Case Studies',
      description: 'Explore in-depth case studies for selected projects, delving into the challenges faced, solutions implemented, and the overall outcomes. Each case study provides a detailed analysis of the project, offering valuable insights into my problem-solving abilities.',
      buttonText: 'Download Case Studies',
      fileUrl: 'assets/downloads/case-studies.pdf'
    },
    {
      title: 'Code Samples',
      description: 'Access code snippets and samples from various projects, showcasing my proficiency in different technologies. The code samples offer a practical demonstration of my coding skills, making it easier for you to assess my abilities in frontend development.',
      buttonText: 'Download Code Samples',
      fileUrl: 'assets/downloads/code-samples.zip'
    }
  ];

  @ViewChild('scrollable') scrollable!: ElementRef;

  constructor(private http: HttpClient, private router: Router, private renderer: Renderer2, private el: ElementRef, private fb: FormBuilder, private portfolioService: PortfolioServiceService) { }
  ngOnInit() {
    this.portfolioService.goToHome();
    this.colorPickerFormHome = this.fb.group({
      textColor: new FormControl(this.textColor),
      bgColor: new FormControl(this.bgColor),
    });
    this.onScroll(); 
    window.addEventListener('scroll', this.onScroll, true);
  }

  onScroll = () => {
    const sections = ['home', 'about', 'projects', 'download', 'contact'];

    let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop - 100 <= scrollPosition) {
        const headers = document.querySelectorAll('.navbar-nav .nav-link');
        headers.forEach(header => {
          header.classList.remove('active');
        });
        const activeHeader = document.querySelector('.navbar-nav .nav-link[data-section="' + sections[i] + '"]');
        if (activeHeader) {
          activeHeader.classList.add('active');
        }
        break;
      }
    }
  };

  // Placeholder function for handling file download logic
  downloadResource(fileUrl: string): void {
    // Use Angular's HttpClient to fetch the file
    this.http.get(fileUrl, { responseType: 'arraybuffer' }).subscribe((data: ArrayBuffer) => {
      // Create a Blob from the array buffer
      const blob = new Blob([data], { type: 'application/octet-stream' });

      // Create a link element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);

      // Set the download attribute with the file name
      link.download = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the DOM
      document.body.removeChild(link);
    });
  }
  toggleContactForm() {
    this.showContactForm = !this.showContactForm;
  }

  navigateToProject(route: any): void {
    // Use Angular's Router to navigate to the specified route
    // if (route.title == 'Convertors') {
    this.router.navigateByUrl(route.projectLink);
    this.portfolioService.headerConvertor(false);
    // }
    // if (route.title == 'Crown Template') {
    //   window.open(route.projectLink, '_blank');
    // }
  }

  scrollTo(target: string): void {
    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

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
          this.formSuccess = !!response; // Set formSuccess to true if response is truthy
          if (this.formSuccess) {
            this.showFormStatus = true;
            setTimeout(() => {
              this.showFormStatus = false;
              this.resetForm();
            }, 3000); // Hides the success message after 3 seconds
          }
          // console.log("form status", this.formSuccess)
        },
        error: error => {
          // console.error('Form submission failed:', error);
          // Handle error, maybe show an error message
          this.showFormStatus = true;
          setTimeout(() => {
            this.showFormStatus = false;
          }, 3000); // Hides the error message after 3 seconds
        }
      });
  }

  resetForm() {
    this.formData = {
      fullName: '',
      email: '',
      phoneNumber: '',
      message: ''
    };
  }

  restrictInput(event: any) {
    const input = event.target;
    const regex = /^[+]{0,1}[0-9]*$/;
    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^+0-9]/g, '');
    }
  }

  openColorPicker() {
    this.isColorPicker = !this.isColorPicker;
    // this.activeSection = 'colorpicker';
  }

  emitColorChange(): void {
    const colors = this.colorPickerFormHome.value;
    this.applyColors(colors);
    // this.closeNavbar();
  }

  applyColors(colors: { textColor: string; bgColor: string }): void {
    document.documentElement.style.setProperty('--primary-color', colors.textColor);
    document.documentElement.style.setProperty('--bg-color', colors.bgColor);
    this.isColorPicker = false;
  }

  toggleNavbar(): void {
    if (this.isTogglingNavbar) {
      return; // If already in progress, ignore the click
    }

    // Close color picker if open
    if (this.isColorPicker) {
      this.isColorPicker = false;
    }

    this.isTogglingNavbar = true;

    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    if (this.isNavbarCollapsed) {
      this.closeNavbar();
    }

    // Reset the flag after a short delay (adjust as needed)
    setTimeout(() => {
      this.isTogglingNavbar = false;
    }, 300);
  }

  closeNavbar(): void {
    this.isNavbarCollapsed = true;
    this.renderer.removeClass(this.el.nativeElement.querySelector('.navbar-collapse'), 'show');
  }

}
