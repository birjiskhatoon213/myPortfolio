// src/app/app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-portfolio';

  headerTextColor = ''; // Default text color
  headerBgColor = '';   // Default background color

  onColorChange(colors: { textColor: string; bgColor: string }) {
    this.headerTextColor = colors.textColor;
    this.headerBgColor = colors.bgColor;
  }
}
