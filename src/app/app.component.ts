// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  ngOnInit(): void {
    this.router.navigate(['/home']);
    window.scroll(0, 0);
  }

  onColorChange(colors: { textColor: string; bgColor: string }) {
    this.headerTextColor = colors.textColor;
    this.headerBgColor = colors.bgColor;
  }
}
