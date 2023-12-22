import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { PortfolioServiceService, Category } from '../portfolio-service.service';

@Component({
  selector: 'app-convertors',
  templateUrl: './convertors.component.html',
  styleUrls: ['./convertors.component.css']
})
export class ConvertorsComponent implements AfterViewInit {
  @ViewChildren('convertorElement') convertorElements!: QueryList<ElementRef>;
  categories: Category[] = [];

  constructor(private portfolioService: PortfolioServiceService) { }

  ngOnInit() {
    this.categories = this.portfolioService.categories;
    this.portfolioService.selectedConvertor$.subscribe((selectedConvertor) => {
      this.scrollToConvertor(selectedConvertor);
    });
  }

  ngAfterViewInit() {
    // Add any necessary logic after the view has been initialized
  }

  private scrollToConvertor(convertorName: string | null) {
    if (!convertorName) {
      return;
    }
  
    const convertorElement = this.convertorElements.find(element => {
      const dataConvertorName = element.nativeElement.getAttribute('data-convertor-name');
      return dataConvertorName === convertorName;
    });
  
    if (convertorElement) {
      // Get the current scroll position
      const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
  
      // Get the top position of the selected convertor relative to the viewport
      const convertorTopPosition = convertorElement.nativeElement.getBoundingClientRect().top;
  
      // Scroll to the selected convertor position plus 30 pixels
      window.scrollTo({
        top: currentScrollPosition + convertorTopPosition - 120,
        behavior: 'smooth'
      });
    }
  }
  

}
