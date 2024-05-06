import { Component, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { PortfolioServiceService } from '../portfolio-service.service';

@Component({
  selector: 'app-medica',
  templateUrl: './medica.component.html',
  styleUrls: ['./medica.component.css']
})
export class MedicaComponent {

  features: any[] = [
    {
      header: 'Virtual Assistant',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, suscipit.'
    },
    {
      header: 'Virtual Clinic',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, suscipit.'
    },
    {
      header: 'Clinical results',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, suscipit.'
    },
  ]

  practices: any[] = [
    {
      header: 'Cardiology',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, exercitationemnesciunt. Optio!'
    },
    {
      header: 'Orthopedics',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, exercitationemnesciunt. Optio!'
    },
    {
      header: 'Opthamology',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, exercitationemnesciunt. Optio!'
    },
    {
      header: 'Pediatrics',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, exercitationemnesciunt. Optio!'
    },
    {
      header: 'Nutrition',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, exercitationemnesciunt. Optio!'
    },
    {
      header: 'General',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, exercitationemnesciunt. Optio!'
    }
  ];

  data = [
    {
      title: 'Dedicated doctors with the core mission to help.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      button: 'See our doctors',
      imageUrl: 'assets/img1.png',
      alt: 'Image 1'
    },
    {
      title: 'Get access to specialty tests and breakthrough information.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      button: 'Find test',
      imageUrl: 'assets/img2.jpg',
      alt: 'Image 2'
    },
    {
      title: 'Find out how we can help you help you.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      button: 'Book a virtual appointment',
      imageUrl: 'assets/img3.jpg',
      alt: 'Image 3'
    }
  ];

  letters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];

  symptoms = [
    "Abdominal pain", "Chest pain", "Constipation", "Cough", "Breath difficulty", "Red eye", "Foot pain", "Foot swelling", "Headache",
    "Heart palpitation", "Knee pain", "Hip pain", "Low back pain", "Nasal congestion", "Neck pain"
  ];

  doctors = [
    { name: 'Dr. John', image: 'assets/mod6.jpg', data: 'Cardiologist', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
    { name: 'Dr. Lisa', image: 'assets/mod2.jpg', data: 'Dermatologist', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
    { name: 'Dr. David', image: 'assets/mod7.jpg', data: 'Pediatrician', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
    { name: 'Dr. Emily', image: 'assets/mod4.jpg', data: 'Oncologist', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
    { name: 'Dr. Michael', image: 'assets/mod8.jpg', data: 'Orthopedic Surgeon', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
    { name: 'Dr. Sarah', image: 'assets/mod1.jpg', data: 'Gynecologist', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
    { name: 'Dr. Rachel', image: 'assets/mod3.jpg', data: 'Neurologist', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
    { name: 'Dr. Emma', image: 'assets/mod5.jpg', data: 'Psychiatrist', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' }
  ];

  cards = [
    { title: 'Card 1', image: 'assets/news1.jpg', date: 'November 23, 2024', text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { title: 'Card 2', image: 'assets/news2.jpg', date: 'December 12, 2024', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in magna eu odio lacinia lobortis. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { title: 'Card 3', image: 'assets/news3.jpg', date: 'January 5, 2025', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { title: 'Card 1', image: 'assets/news4.jpg', date: 'November 23, 2024', text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { title: 'Card 2', image: 'assets/news5.jpg', date: 'December 12, 2024', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in magna eu odio lacinia lobortis.' },
    { title: 'Card 3', image: 'assets/news6.jpg', date: 'January 5, 2025', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' }
  ];

  isNavbarCollapsed = true;
  isMedicoNavbarCollapsed = true;
  isTogglingNavbar = false;
  @ViewChild('scrollable') scrollable!: ElementRef;

  constructor(private renderer: Renderer2, private el: ElementRef, private portfolioService: PortfolioServiceService) { }

  ngOnInit() {

  }

  scrollTo(target: string): void {
    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.closeNavbar();
    }

    this.isMedicoNavbarCollapsed = true;
  }

  toggleNavbar(): void {
    if (this.isTogglingNavbar) {
      return; // If already in progress, ignore the click
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

  goToHome() {
    this.portfolioService.goToHome();
    // this.scrollTo('home');
    this.isMedicoNavbarCollapsed = true;
    window.scroll(0, 0);
  }

  toggleMedicoNavbar() {
    this.isMedicoNavbarCollapsed = !this.isMedicoNavbarCollapsed;
  }

  // scroll(direction: number) {
  //   this.scrollable.nativeElement.scrollLeft += direction * 200;
  // }
}
