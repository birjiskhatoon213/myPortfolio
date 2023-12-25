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
  openConvertor: string | undefined;
  activeTab: string = '';
  fromUnit: string = '';
  toUnit: string = '';

  constructor(private portfolioService: PortfolioServiceService) { }

  ngOnInit() {
    this.categories = this.portfolioService.categories;
    this.portfolioService.selectedConvertor$.subscribe((selectedConvertor) => {
      this.scrollToConvertor(selectedConvertor);
    });
    this.portfolioService.callFunction$.subscribe(() => {
      // Call your desired function here
      this.goToConvertorsList();
    });
  }

  ngAfterViewInit() {
    // Add any necessary logic after the view has been initialized
  }

  private scrollToConvertor(convertorName: string | null) {
    if (!convertorName) {
      window.scrollTo(0, 0);
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

  goToConvertorsList() {
    this.openConvertor = undefined;
  }

  toggleTab(tab: string) {
    this.activeTab = tab;
  }

  setActiveTab(convertor: any) {
    this.activeTab = convertor.name;
    this.toggleTab(this.activeTab);
  }

  selectConvertor(convertor: any) {
    this.openConvertor = convertor.name;
    this.setActiveTab(convertor);

    // Extract units from openConvertor
    if (this.openConvertor) {
      const { fromUnit, toUnit } = this.extractUnits(this.openConvertor);

      // Assign extracted units to component properties
      this.fromUnit = fromUnit;
      this.toUnit = toUnit;
    }
  }

  private extractUnits(input: string): { fromUnit: string, toUnit: string } {
    const units = input.split(' to ');

    if (units.length !== 2) {
      throw new Error('Invalid input format. Must be in the form "fromUnit to toUnit".');
    }

    const fromUnit = units[0].trim();
    const toUnit = units[1].trim();

    return { fromUnit, toUnit };
  }
}
