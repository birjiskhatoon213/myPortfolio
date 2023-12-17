// src/app/header/header.component.ts
import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNavbarCollapsed = true;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  scrollTo(target: string): void {
    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.closeNavbar();
    }
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    if (this.isNavbarCollapsed) {
      this.closeNavbar();
    }
  }

  closeNavbar(): void {
    this.isNavbarCollapsed = true;
    this.renderer.removeClass(this.el.nativeElement.querySelector('.navbar-collapse'), 'show');
  }
}
