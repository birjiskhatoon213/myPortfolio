// src/app/app.component.ts

import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  title = 'my-portfolio';

  headerTextColor = ''; // Default text color
  headerBgColor = '';   // Default background color
  isPhotosHeader: boolean = false;

  ngOnInit(): void {
    this.router.navigate(['/home']);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateHeaderBasedOnRoute(event.url);
      });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    });
    // window.scroll(0, 0);
  }

  onColorChange(colors: { textColor: string; bgColor: string }) {
    this.headerTextColor = colors.textColor;
    this.headerBgColor = colors.bgColor;
  }

  updateHeaderBasedOnRoute(url: string): void {
    // Check if the current route matches the desired pattern
    // this.isConvertorsHeader = url.includes('/home/projects/convertors');
    // this.isMedicoHeader = url.includes('/home/projects/medica');
    this.isPhotosHeader = url.includes('/home/projects/photos');
    // this.portfolioService.headerConvertor(false);
  }
}
