// src/app/header/header.component.ts
import { Component, Renderer2, ElementRef, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PortfolioServiceService } from '../portfolio-service.service';

interface Category {
  name: string;
  convertors: string[];
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

  categories: Category[] = [
    {
      name: "Web Development",
      convertors: ["Pixels to Rem", "RGB to Hex", "Hex to RGB", "em to px", "% to px"]
    },
    {
      name: "Color Conversions",
      convertors: ["RGB to CMYK", "HEX to HSL", "HSL to RGB", "HSV to RGB", "Color name to HEX/RGB"]
    },
    {
      name: "Typography",
      convertors: ["Points to Pixels", "Pixels to Points", "Ems to Pixels", "Pixels to Ems", "Line height converter"]
    },
    {
      name: "Temperature",
      convertors: ["Celsius to Fahrenheit", "Fahrenheit to Celsius", "Kelvin to Celsius", "Celsius to Kelvin"]
    },
    {
      name: "Time",
      convertors: ["Hours to Minutes", "Minutes to Seconds", "Days to Hours", "Years to Days", "Epoch/Unix Timestamp Converter"]
    },
    {
      name: "Length and Distance",
      convertors: ["Inches to Centimeters", "Feet to Meters", "Miles to Kilometers", "Yards to Meters"]
    },
    {
      name: "Currency",
      convertors: ["USD to EUR", "EUR to GBP", "Currency Converter (customizable for multiple currencies)"]
    },
    {
      name: "Volume",
      convertors: ["Gallons to Liters", "Liters to Milliliters", "Cubic Inches to Cubic Centimeters"]
    },
    {
      name: "Weight and Mass",
      convertors: ["Pounds to Kilograms", "Kilograms to Grams", "Ounces to Grams"]
    },
    {
      name: "Data Storage",
      convertors: ["Bytes to Kilobytes", "Kilobytes to Megabytes", "Megabytes to Gigabytes", "Gigabytes to Terabytes"]
    },
    {
      name: "Speed",
      convertors: ["Miles per Hour to Kilometers per Hour", "Kilometers per Hour to Meters per Second"]
    },
    {
      name: "Energy",
      convertors: ["Joules to Calories", "Calories to Kilocalories", "Electronvolts to Joules"]
    },
    {
      name: "Pressure",
      convertors: ["Pascals to Atmospheres", "Atmospheres to Pascals", "Pounds per Square Inch (PSI) to Pascals"]
    },
    {
      name: "Area",
      convertors: ["Square Meters to Square Feet", "Square Kilometers to Square Miles", "Acres to Square Meters"]
    },
    {
      name: "Angles",
      convertors: ["Degrees to Radians", "Radians to Degrees", "Gradians to Degrees"]
    },
    {
      name: "Sound",
      convertors: ["Decibels to Watts", "Watts to Decibels"]
    },
    {
      name: "Photography",
      convertors: ["Megapixels to Pixels", "Pixels to Megapixels"]
    },
    {
      name: "Fuel Efficiency",
      convertors: ["Miles per Gallon to Liters per 100 Kilometers", "Liters per 100 Kilometers to Miles per Gallon"]
    }
  ];

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
}
