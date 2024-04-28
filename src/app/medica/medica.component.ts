import { Component } from '@angular/core';

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
      button:'See our doctors',
      imageUrl: 'assets/img1.png',
      alt: 'Image 1'
    },
    {
      title: 'Get access to specialty tests and breakthrough information.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      button:'Find test',
      imageUrl: 'assets/img2.jpg',
      alt: 'Image 2'
    },
    {
      title: 'Find out how we can help you help you.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      button:'Book a virtual appointment',
      imageUrl: 'assets/img3.jpg',
      alt: 'Image 3'
    }
  ];


  constructor() { }

  ngOnInit() {

  }
}
