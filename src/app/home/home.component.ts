import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PortfolioServiceService } from '../portfolio-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showContactForm: boolean = false; // Flag to toggle between initial content and form

  // Include your contact information
  phoneNumber: string = "123-456-7890";
  emailId: string = "birjiskhatoon213@gmail.com";

  skills: string[] = [
    'HTML', 'CSS', 'JavaScript', 'React', 'SASS', 'GIT', 'Github',
    'Responsive Design', 'SEO', 'Terminal', 'Express Basics', 'SQL Basics'
  ];

  projects: any[] = [
    {
      title: 'Convertors',
      description: 'Convertors is a successful Open-Source project that I created which has been featured on some of the biggest tech sites like CSS-Tricks, Hostinger, etc. & used by thousands of developers globally. Dopefolio is a successful Open-Source project that I created which has been featured on some of the biggest tech sites like CSS-Tricks, Hostinger, etc. & used by thousands of developers globally.',
      projectLink: 'home/projects/convertors'
    },
    {
      title: 'Wilsonport',
      description: 'Wilsonport is a multiservice logistics and transport company, and I created their website from scratch using the frontend tools I know.',
      projectLink: 'home/projects/medico'
    },
    {
      title: 'Boreal Coffee Clone',
      description: 'I re-created the frontend of Boreal Coffee\'s official web app because I got attracted to their beautiful UI. It was a great experience for me to build the entire frontend.',
      caseStudy: 'CASE STUDY'
    },
    {
      title: 'Crown Template',
      description: 'Crown is a web template that I created targeting the restaurant and food industry, which anyone can use to present their business online.',
      projectLink: '/https://www.placementpreparation.io/blog/best-websites-to-learn-angular/'
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
      fileUrl: 'assets/downloads/resume.pdf'
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

  constructor(private http: HttpClient, private router: Router, private portfolioService: PortfolioServiceService) { }
  ngOnInit() {
    this.portfolioService.goToHome();
  }

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

  submitForm() {
    // Add your form submission logic here
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
}
