// src/app/header/header.component.ts
import { Component, Renderer2, ElementRef, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PortfolioServiceService } from '../portfolio-service.service';

interface Category {
  name: string;
  convertors: Convertor[];
}

interface Convertor {
  name: string;
  description: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() categorySelected = new EventEmitter<string>();
  textColor: string = '#C17F6A';
  // #25BD94
  bgColor: string = '#0A0F38';
  isNavbarCollapsed = true;
  colorPickerForm: FormGroup;
  isTogglingNavbar = false;
  isColorPicker = false;
  isConvertorsHeader: boolean = false;
  showAllConvertors = false;
  openConvertor: string | undefined;

  categories: Category[] = [
    {
      "name": "Web Development",
      "convertors": [
        { "name": "Pixels to Rem", "description": "Converts pixel values to rem units for responsive web design." },
        { "name": "RGB to Hex", "description": "Converts RGB color values to hexadecimal color codes." },
        { "name": "Hex to RGB", "description": "Converts hexadecimal color codes to RGB color values." },
        { "name": "em to px", "description": "Converts em units to pixels." },
        { "name": "% to px", "description": "Converts percentage values to pixels." }
      ]
    },
    {
      "name": "Color Conversions",
      "convertors": [
        { "name": "RGB to CMYK", "description": "Converts RGB color values to CMYK color values for printing." },
        { "name": "HEX to HSL", "description": "Converts hexadecimal color codes to HSL color values." },
        { "name": "HSL to RGB", "description": "Converts HSL color values to RGB color values." },
        { "name": "HSV to RGB", "description": "Converts HSV color values to RGB color values." },
        { "name": "Color name to HEX/RGB", "description": "Converts color names to hexadecimal or RGB color values." }
      ]
    },
    {
      "name": "Typography",
      "convertors": [
        { "name": "Points to Pixels", "description": "Converts typography points to pixels." },
        { "name": "Pixels to Points", "description": "Converts pixels to typography points." },
        { "name": "Ems to Pixels", "description": "Converts em units to pixels." },
        { "name": "Pixels to Ems", "description": "Converts pixels to em units." },
        { "name": "Line height converter", "description": "Converts line height values." }
      ]
    },
    {
      "name": "Temperature",
      "convertors": [
        { "name": "Celsius to Fahrenheit", "description": "Converts Celsius temperatures to Fahrenheit." },
        { "name": "Fahrenheit to Celsius", "description": "Converts Fahrenheit temperatures to Celsius." },
        { "name": "Kelvin to Celsius", "description": "Converts Kelvin temperatures to Celsius." },
        { "name": "Celsius to Kelvin", "description": "Converts Celsius temperatures to Kelvin." }
      ]
    },
    {
      "name": "Time",
      "convertors": [
        { "name": "Hours to Minutes", "description": "Converts hours to minutes." },
        { "name": "Minutes to Seconds", "description": "Converts minutes to seconds." },
        { "name": "Days to Hours", "description": "Converts days to hours." },
        { "name": "Years to Days", "description": "Converts years to days." },
        { "name": "Epoch/Unix Timestamp Converter", "description": "Converts Epoch/Unix timestamps." }
      ]
    },
    {
      "name": "Length and Distance",
      "convertors": [
        { "name": "Inches to Centimeters", "description": "Converts inches to centimeters." },
        { "name": "Feet to Meters", "description": "Converts feet to meters." },
        { "name": "Miles to Kilometers", "description": "Converts miles to kilometers." },
        { "name": "Yards to Meters", "description": "Converts yards to meters." }
      ]
    },
    {
      "name": "Currency",
      "convertors": [
        { "name": "USD to EUR", "description": "Converts US Dollars to Euros." },
        { "name": "EUR to GBP", "description": "Converts Euros to British Pounds." },
        { "name": "Currency Converter (customizable for multiple currencies)", "description": "A customizable currency converter." }
      ]
    },
    {
      "name": "Volume",
      "convertors": [
        { "name": "Gallons to Liters", "description": "Converts gallons to liters." },
        { "name": "Liters to Milliliters", "description": "Converts liters to milliliters." },
        { "name": "Cubic Inches to Cubic Centimeters", "description": "Converts cubic inches to cubic centimeters." }
      ]
    },
    {
      "name": "Weight and Mass",
      "convertors": [
        { "name": "Pounds to Kilograms", "description": "Converts pounds to kilograms." },
        { "name": "Kilograms to Grams", "description": "Converts kilograms to grams." },
        { "name": "Ounces to Grams", "description": "Converts ounces to grams." }
      ]
    },
    {
      "name": "Data Storage",
      "convertors": [
        { "name": "Bytes to Kilobytes", "description": "Converts bytes to kilobytes." },
        { "name": "Kilobytes to Megabytes", "description": "Converts kilobytes to megabytes." },
        { "name": "Megabytes to Gigabytes", "description": "Converts megabytes to gigabytes." },
        { "name": "Gigabytes to Terabytes", "description": "Converts gigabytes to terabytes." }
      ]
    },
    {
      "name": "Speed",
      "convertors": [
        { "name": "Miles per Hour to Kilometers per Hour", "description": "Converts speed from miles per hour to kilometers per hour." },
        { "name": "Kilometers per Hour to Meters per Second", "description": "Converts speed from kilometers per hour to meters per second." }
      ]
    },
    {
      "name": "Energy",
      "convertors": [
        { "name": "Joules to Calories", "description": "Converts energy from joules to calories." },
        { "name": "Calories to Kilocalories", "description": "Converts energy from calories to kilocalories." },
        { "name": "Electronvolts to Joules", "description": "Converts energy from electronvolts to joules." }
      ]
    },
    {
      "name": "Pressure",
      "convertors": [
        { "name": "Pascals to Atmospheres", "description": "Converts pressure from pascals to atmospheres." },
        { "name": "Atmospheres to Pascals", "description": "Converts pressure from atmospheres to pascals." },
        { "name": "Pounds per Square Inch (PSI) to Pascals", "description": "Converts pressure from pounds per square inch (PSI) to pascals." }
      ]
    },
    {
      "name": "Area",
      "convertors": [
        { "name": "Square Meters to Square Feet", "description": "Converts area from square meters to square feet." },
        { "name": "Square Kilometers to Square Miles", "description": "Converts area from square kilometers to square miles." },
        { "name": "Acres to Square Meters", "description": "Converts area from acres to square meters." }
      ]
    },
    {
      "name": "Angles",
      "convertors": [
        { "name": "Degrees to Radians", "description": "Converts angles from degrees to radians." },
        { "name": "Radians to Degrees", "description": "Converts angles from radians to degrees." },
        { "name": "Gradians to Degrees", "description": "Converts angles from gradians to degrees." }
      ]
    },
    {
      "name": "Sound",
      "convertors": [
        { "name": "Decibels to Watts", "description": "Converts sound intensity from decibels to watts." },
        { "name": "Watts to Decibels", "description": "Converts power from watts to decibels." }
      ]
    },
    {
      "name": "Photography",
      "convertors": [
        { "name": "Megapixels to Pixels", "description": "Converts resolution from megapixels to pixels." },
        { "name": "Pixels to Megapixels", "description": "Converts resolution from pixels to megapixels." }
      ]
    },
    {
      "name": "Fuel Efficiency",
      "convertors": [
        { "name": "Miles per Gallon to Liters per 100 Kilometers", "description": "Converts fuel efficiency from miles per gallon to liters per 100 kilometers." },
        { "name": "Liters per 100 Kilometers to Miles per Gallon", "description": "Converts fuel efficiency from liters per 100 kilometers to miles per gallon." }
      ]
    }
  ]

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private renderer: Renderer2, private el: ElementRef, private fb: FormBuilder, private portfolioService: PortfolioServiceService) {
    // Initialize the colorPickerForm with default values
    this.colorPickerForm = this.fb.group({
      textColor: new FormControl(this.textColor),
      bgColor: new FormControl(this.bgColor),
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateHeaderBasedOnRoute(event.url);
      });
    // const categoriesData: Category[] = ;
    this.portfolioService.setCategories(this.categories);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth < 992) {
      this.isColorPicker = false; // Close color picker on mobile view
    }
  }

  scrollTo(target: string): void {
    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.closeNavbar();
    }
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

  emitColorChange(): void {
    const colors = this.colorPickerForm.value;
    this.applyColors(colors);
  }

  applyColors(colors: { textColor: string; bgColor: string }): void {
    document.documentElement.style.setProperty('--primary-color', colors.textColor);
    document.documentElement.style.setProperty('--bg-color', colors.bgColor);
    this.isColorPicker = false;
  }

  openColorPicker() {
    this.isColorPicker = !this.isColorPicker;
  }

  updateHeaderBasedOnRoute(url: string): void {
    // Check if the current route matches the desired pattern
    this.isConvertorsHeader = url.includes('/home/projects/convertors');
  }

  selectCategory(category: string): void {
    this.categorySelected.emit(category);
  }

  toggleAllConvertors(): void {
    this.showAllConvertors = !this.showAllConvertors;
  }

  // Method to handle click on convertor name in the header
  onConvertorNameClick(convertorName: string): void {
    // Emit an event or use a service to notify the Convertors component about the selected convertor
    this.portfolioService.setSelectedConvertor(convertorName);
    this.toggleAllConvertors();
  }

  goToConvertorsList(): void {
    this.portfolioService.triggerFunctionCall();
    window.scroll(0, 0);
  }

}
