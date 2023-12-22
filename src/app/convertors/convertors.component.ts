import { Component } from '@angular/core';
import { PortfolioServiceService } from '../portfolio-service.service';
import { Category } from '../portfolio-service.service';

@Component({
  selector: 'app-convertors',
  templateUrl: './convertors.component.html',
  styleUrls: ['./convertors.component.css']
})
export class ConvertorsComponent {
  categories: Category[] = [];
  fields = [
    { title: 'Web Development', description: 'Convertors for web development', link: '/convertors/web-development' },
    // Add other fields as needed
  ];

  constructor(private portfolioService: PortfolioServiceService) {}

  ngOnInit() {
    this.categories = this.portfolioService.categories;
  }
  
}
