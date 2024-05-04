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
  // openConvertor: string | undefined;
  activeTab: string = '';
  fromUnit: string = '';
  toUnit: string = '';
  xValue: any;
  yValue: any;
  pxValue: number | null = null;
  remValue: number | null = null;
  selectedConvertor: any;

  showAllConvertors = false;

  constructor(public portfolioService: PortfolioServiceService) { }

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
    this.portfolioService.goToConvertorsLista();
    window.scroll(0, 0);
  }

  goToHome() {
    this.portfolioService.goToHome();
    window.scroll(0, 0);
  }

  toggleAllConvertors(): void {
    this.showAllConvertors = !this.showAllConvertors;
  }

  // Method to handle click on convertor name in the header
  onConvertorNameClick(convertorName: any): void {
    // this.portfolioService.goToConvertorsLista();
    // Emit an event or use a service to notify the Convertors component about the selected convertor
    this.portfolioService.setSelectedConvertor(convertorName.name);
    this.toggleAllConvertors();
    if(this.portfolioService.convertorInside == true){
      this.selectConvertor(convertorName);
    }
  }
  toggleTab(tab: string) {
    this.activeTab = tab;
  }

  setActiveTab(convertor: any) {
    this.activeTab = convertor.name;
    this.toggleTab(this.activeTab);
  }

  selectConvertor(convertor: any) {
    this.portfolioService.openConvertor = convertor.name;
    this.selectedConvertor = convertor;
    this.setActiveTab(convertor);
    this.portfolioService.convertorInside = true;

    this.xValue = '';
    this.yValue = '';
  }

  // private extractUnits(input: string): { fromUnit: string, toUnit: string } {
  //   const units = input.split(' to ');

  //   if (units.length !== 2) {
  //     throw new Error('Invalid input format. Must be in the form "fromUnit to toUnit".');
  //   }

  //   const fromUnit = units[0].trim();
  //   const toUnit = units[1].trim();

  //   return { fromUnit, toUnit };
  // }

  convertPxToRem() {
    if (this.pxValue !== undefined && this.pxValue !== null) {
      this.remValue = this.pxValue / 16;
    } else {
      this.remValue = null;
    }
  }

  convertRemToPx() {
    if (this.remValue !== undefined && this.remValue !== null) {
      this.pxValue = this.remValue * 16;
    } else {
      this.pxValue = null;
    }
  }

  convertXValue() {
    if (!this.selectedConvertor) return;

    switch (this.selectedConvertor.name) {
      case 'Pixels to Rem':
        this.yValue = this.xValue / 16; // Assuming 1rem = 16px
        break;
      case 'RGB to Hex':
        this.yValue = this.rgbToHex(this.xValue);
        break;
      case 'Hex to RGB':
        this.yValue = this.hexToRgb(this.xValue);
        break;
      case 'em to px':
        this.yValue = this.xValue * 16; // Assuming 1rem = 16px
        break;
      case '% to px':
        this.yValue = (this.xValue as number) / 16 * 100;
        break;
      case 'RGB to CMYK':
        this.yValue = this.rgbToCmyk(this.xValue);
        break;
      case 'CMYK to RGB':
        this.yValue = this.cmykToRgb(this.xValue);
        break;
      case 'HEX to HSL':
        this.yValue = this.hexToHsl(this.xValue);
        break;
      case 'HSL to RGB':
        this.yValue = this.hslToRgb(this.xValue);
        break;
      case 'HSV to RGB':
        this.yValue = this.hsvToRgb(this.xValue);
        break;
      case 'Color name to HEX/RGB':
        this.yValue = this.colorNameToHexRgb(this.xValue);
        break;
      // Add other conversions for "Web Development" category here
      default:
        console.error('Unsupported converter');
    }
  }

  convertYValue() {
    if (!this.selectedConvertor) return;

    switch (this.selectedConvertor.name) {
      case 'Pixels to Rem':
        this.xValue = this.yValue * 16; // Assuming 1rem = 16px
        break;
      case 'RGB to Hex':
        this.xValue = this.rgbToHex(this.yValue);
        break;
      case 'Hex to RGB':
        this.xValue = this.hexToRgb(this.yValue);
        break;
      case 'em to px':
        this.xValue = this.yValue / 16; // Assuming 1rem = 16px
        break;
      case '% to px':
        this.xValue = (this.yValue as number) * 16;
        break;
      case 'RGB to CMYK':
        this.xValue = this.cmykToRgb(this.yValue);
        break;
      case 'CMYK to RGB':
        this.xValue = this.rgbToCmyk(this.yValue);
        break;
      case 'HEX to HSL':
        this.xValue = this.hexToHsl(this.yValue);
        break;
      case 'HSL to RGB':
        this.xValue = this.hslToRgb(this.yValue);
        break;
      case 'HSV to RGB':
        this.xValue = this.hsvToRgb(this.yValue);
        break;
      case 'Color name to HEX/RGB':
        this.xValue = this.colorNameToHexRgb(this.yValue);
        break;
      // Add other conversions for "Web Development" category here
      default:
        console.error('Unsupported converter');
    }
  }

  private rgbToHex(rgb: string): string {
    const [r, g, b] = rgb.split(',').map(val => parseInt(val).toString(16).padStart(2, '0'));
    return `#${r}${g}${b}`;
  }

  private hexToRgb(hex: string): string {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  }

  private rgbToCmyk(rgb: string): string {
    const [r, g, b] = rgb.split(',').map(val => parseFloat(val) / 255);

    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    return `${Math.round(c * 100)},${Math.round(m * 100)},${Math.round(y * 100)},${Math.round(k * 100)}`;
  }

  private cmykToRgb(cmyk: string): string {
    const [c, m, y, k] = cmyk.split(',').map(val => parseFloat(val) / 100);

    const r = (1 - c) * (1 - k) * 255;
    const g = (1 - m) * (1 - k) * 255;
    const b = (1 - y) * (1 - k) * 255;

    return `${Math.round(r)},${Math.round(g)},${Math.round(b)}`;
  }

  private hexToHsl(hex: string): string {
    const [r, g, b] = hex.match(/\w\w/g)?.map(val => parseInt(val, 16)) || [0, 0, 0];

    const rf = r / 255;
    const gf = g / 255;
    const bf = b / 255;

    const max = Math.max(rf, gf, bf);
    const min = Math.min(rf, gf, bf);
    const diff = max - min;

    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
      switch (max) {
        case rf:
          h = (gf - bf) / diff + (gf < bf ? 6 : 0);
          break;
        case gf:
          h = (bf - rf) / diff + 2;
          break;
        case bf:
          h = (rf - gf) / diff + 4;
          break;
      }
      h *= 60;
    }
    return `${Math.round(h)},${Math.round(s * 100)}%,${Math.round(l * 100)}%`;
  }

  private hslToRgb(hsl: string): string {
    const [h, s, l] = hsl.split(',').map(val => parseFloat(val));
    const hf = h / 360;
    const sf = s / 100;
    const lf = l / 100;

    let r = 0,
      g = 0,
      b = 0;
    if (s === 0) {
      r = g = b = lf;
    } else {
      const hueToRgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = lf < 0.5 ? lf * (1 + sf) : lf + sf - lf * sf;
      const p = 2 * lf - q;
      r = hueToRgb(p, q, hf + 1 / 3);
      g = hueToRgb(p, q, hf);
      b = hueToRgb(p, q, hf - 1 / 3);
    }

    return `${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)}`;
  }

  private hsvToRgb(hsv: string): string {
    const [h, s, v] = hsv.split(',').map(val => parseFloat(val));
    const hf = h / 60;
    const sf = s / 100;
    const vf = v / 100;

    const c = vf * sf;
    const x = c * (1 - Math.abs((hf % 2) - 1));
    const m = vf - c;

    let r = 0,
      g = 0,
      b = 0;
    if (hf >= 0 && hf < 1) {
      r = c;
      g = x;
    } else if (hf >= 1 && hf < 2) {
      r = x;
      g = c;
    } else if (hf >= 2 && hf < 3) {
      g = c;
      b = x;
    } else if (hf >= 3 && hf < 4) {
      g = x;
      b = c;
    } else if (hf >= 4 && hf < 5) {
      r = x;
      b = c;
    } else if (hf >= 5 && hf < 6) {
      r = c;
      b = x;
    }

    return `${Math.round((r + m) * 255)},${Math.round((g + m) * 255)},${Math.round((b + m) * 255)}`;
  }

  private colorNameToHexRgb(colorName: string): string {
    // Your logic for converting color names to hex/rgb values
    return "Conversion logic for color names to hex/rgb";
  }

}
