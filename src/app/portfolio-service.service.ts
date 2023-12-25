// src/app/portfolio-service.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioServiceService {
  categories: Category[] = [];

  private selectedConvertorSubject = new BehaviorSubject<string | null>(null);
  selectedConvertor$ = this.selectedConvertorSubject.asObservable();

  private callFunctionSubject = new Subject<void>();
  callFunction$ = this.callFunctionSubject.asObservable();

  constructor() { }

  setCategories(categories: Category[]): void {
    this.categories = categories;
  }

  setSelectedConvertor(convertorName: string | null): void {
    this.selectedConvertorSubject.next(convertorName);
  }

  // Method to trigger function call in ConvertorsComponent
  triggerFunctionCall(): void {
    this.callFunctionSubject.next();
  }

}

// Assuming that Category and Convertor are declared in the same file as PortfolioServiceService
export interface Category {
  name: string;
  convertors: Convertor[];
}

export interface Convertor {
  name: string;
  description: string;
}
