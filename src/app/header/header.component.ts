// src/app/header/header.component.ts
import { Component, Renderer2, ElementRef , HostListener} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  textColor: string = '#C17F6A';
  // #25BD94
  bgColor: string = '#0A0F38';
  isNavbarCollapsed = true;
  colorPickerForm: FormGroup;
  isTogglingNavbar = false;
  isColorPicker = false;

  constructor(private renderer: Renderer2, private el: ElementRef, private fb: FormBuilder) {
    // Initialize the colorPickerForm with default values
    this.colorPickerForm = this.fb.group({
      textColor: new FormControl(this.textColor),
      bgColor: new FormControl(this.bgColor),
    });
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
}
