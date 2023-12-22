// portfolio-service.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioServiceService {
  categories: Category[] = [];

  constructor() { }

  setCategories(categories: Category[]): void {
    this.categories = categories;
  }
}

// Assuming that Category is declared in the same file as PortfolioServiceService
export interface Category {
  name: string;
  convertors: string[];
}
