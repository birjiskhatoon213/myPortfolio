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
  inputName?: string;
  inputUnit?: string;
  outputName?: string;
  outputUnit?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() categorySelected = new EventEmitter<string>();
  textColor: string = '#2461FF';
  // #25BD94
  bgColor: string = '#FFFFFF';
  isNavbarCollapsed = true;
  isMedicoNavbarCollapsed = true;
  colorPickerForm: FormGroup;
  isTogglingNavbar = false;
  isColorPicker = false;
  isHomeHeaderTag: boolean = true;
  isConvertorsHeader: boolean = false;
  showAllConvertors = false;
  openConvertor: string | undefined;
  categories: Category[] = [];

  isMedicoHeader: boolean = false;
  activeSection: string = 'home';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private renderer: Renderer2, private el: ElementRef, private fb: FormBuilder, public portfolioService: PortfolioServiceService) {
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
    // this.portfolioService.setCategories(this.categories);
    this.categories = this.portfolioService.categories;
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
    this.activeSection = target;
    this.isColorPicker = false;
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
    this.activeSection = 'colorpicker';
  }

  updateHeaderBasedOnRoute(url: string): void {
    this.activeSection = 'home';
  }

  goToHome() {
    this.portfolioService.goToHome();
    // this.scrollTo('home');
    this.isMedicoNavbarCollapsed = true;
    window.scroll(0, 0);
  }
}
