// src/app/portfolio-service.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PortfolioServiceService {
  // categories: Category[] = [];
  openConvertor: string | undefined;
  isHomeHeader: boolean = true;
  convertorInside: boolean = false;
  private selectedConvertorSubject = new BehaviorSubject<string | null>(null);
  selectedConvertor$ = this.selectedConvertorSubject.asObservable();

  private callFunctionSubject = new Subject<void>();
  callFunction$ = this.callFunctionSubject.asObservable();

  categories: Category[] = [
    {
      "name": "Web Development",
      "convertors": [
        {
          "name": "Pixels to Rem",
          "description": "Converts pixel values to rem units for responsive web design.",
          "inputName": "Pixels",
          "inputUnit": "px",
          "outputName": "Rem",
          "outputUnit": "rem",
          "details": "Pixels to Rem conversion is essential for responsive web design, allowing developers to define lengths in relation to the root element's font size. When converting, the pixel value is divided by the root font size, resulting in a flexible unit suitable for various screen sizes and resolutions. This helps maintain consistency and adaptability across different devices and viewport sizes."
        },
        {
          "name": "RGB to Hex",
          "description": "Converts RGB color values to hexadecimal color codes.",
          "inputName": "RGB",
          "inputUnit": "rgb",
          "outputName": "Hex",
          "outputUnit": "hx",
          "details": "RGB to Hex conversion is widely used in web development for specifying colors in CSS and HTML. RGB values, representing the amount of red, green, and blue, are converted to a hexadecimal format. Hexadecimal colors are concise and easy to use in code, offering a wider range of colors than traditional named colors."
        },
        {
          "name": "Hex to RGB",
          "description": "Converts hexadecimal color codes to RGB color values.",
          "inputName": "Hex",
          "inputUnit": "hx",
          "outputName": "RGB",
          "outputUnit": "rgb",
          "details": "Hex to RGB conversion is useful for understanding and manipulating colors specified in hexadecimal format. Hexadecimal colors are widely used in web development, but sometimes it's necessary to convert them back to RGB values for various purposes such as calculations or compatibility with different tools."
        },
        {
          "name": "em to px",
          "description": "Converts em units to pixels.",
          "inputName": "Em",
          "inputUnit": "em",
          "outputName": "Pixels",
          "outputUnit": "px",
          "details": "Em to Pixels conversion is commonly used in web development to ensure consistent sizing relative to the parent element's font size. Em units are flexible and responsive, adjusting dynamically based on changes in the parent element's font size."
        },
        {
          "name": "% to px",
          "description": "Converts percentage values to pixels.",
          "inputName": "Percentage",
          "inputUnit": "%",
          "outputName": "Pixels",
          "outputUnit": "px",
          "details": "Percentage to Pixels conversion is important for web layout and design, allowing developers to specify dimensions relative to the parent element's size. Converting percentages to pixels involves multiplying the percentage value by the parent element's width or height, depending on the context."
        }
      ]
    },
    {
      "name": "Color Conversions",
      "convertors": [
        {
          "name": "RGB to CMYK",
          "description": "Converts RGB color values to CMYK color values for printing.",
          "inputName": "RGB",
          "inputUnit": "rgb",
          "outputName": "CMYK",
          "outputUnit": "cmyk",
          "details": "RGB to CMYK conversion is used in the printing industry to prepare digital images for printing. CMYK represents the four ink colors used in printing: cyan, magenta, yellow, and black. This conversion is necessary to ensure accurate color representation when transferring digital designs to physical prints."
        },
        {
          "name": "HEX to HSL",
          "description": "Converts hexadecimal color codes to HSL color values.",
          "inputName": "Hex",
          "inputUnit": "hx",
          "outputName": "HSL",
          "outputUnit": "hsl",
          "details": "HEX to HSL conversion is useful for understanding and manipulating colors in a more human-readable format. HSL (Hue, Saturation, Lightness) represents colors in terms of hue, saturation, and lightness, which can be more intuitive for some purposes such as color manipulation or visualization."
        },
        {
          "name": "HSL to RGB",
          "description": "Converts HSL color values to RGB color values.",
          "inputName": "HSL",
          "inputUnit": "hsl",
          "outputName": "RGB",
          "outputUnit": "rgb",
          "details": "HSL to RGB conversion is important for transforming colors specified in HSL format into RGB values, which are commonly used in digital design and development. RGB (Red, Green, Blue) is the most common color model for digital screens and web development."
        },
        {
          "name": "HSV to RGB",
          "description": "Converts HSV color values to RGB color values.",
          "inputName": "HSV",
          "inputUnit": "hsv",
          "outputName": "RGB",
          "outputUnit": "rgb",
          "details": "HSV to RGB conversion is used for transforming colors from the HSV (Hue, Saturation, Value) color model to the RGB color model. While HSV is often used in graphic design and image editing software for its intuitive color representation, RGB is more commonly used in digital displays and web development."
        },
        {
          "name": "Color name to HEX/RGB",
          "description": "Converts color names to hexadecimal or RGB color values.",
          "inputName": "Color Name",
          "inputUnit": "name",
          "outputName": "Hex/RGB",
          "outputUnit": "hx/rgb",
          "details": "Color name to HEX/RGB conversion is convenient for developers and designers who prefer to work with color names rather than hexadecimal or RGB values. This conversion allows for easy translation between named colors and digital color representations."
        }
      ]
    },
    {
      "name": "Typography",
      "convertors": [
        {
          "name": "Points to Pixels",
          "description": "Converts typography points to pixels.",
          "inputName": "Points",
          "inputUnit": "pt",
          "outputName": "Pixels",
          "outputUnit": "px",
          "details": "Points to Pixels conversion is common in typography and web design. This conversion allows designers and developers to translate typographic measurements from points to pixels, which are commonly used in digital interfaces."
        },
        {
          "name": "Pixels to Points",
          "description": "Converts pixels to typography points.",
          "inputName": "Pixels",
          "inputUnit": "px",
          "outputName": "Points",
          "outputUnit": "pt",
          "details": "Pixels to Points conversion is useful for designers and developers who work with typography in digital interfaces. Converting pixel-based measurements to points allows for consistent typographic sizing across different devices and resolutions."
        },
        {
          "name": "Ems to Pixels",
          "description": "Converts em units to pixels.",
          "inputName": "Em",
          "inputUnit": "em",
          "outputName": "Pixels",
          "outputUnit": "px",
          "details": "Em to Pixels conversion is commonly used in web development to ensure consistent sizing relative to the parent element's font size. Em units are flexible and responsive, adjusting dynamically based on changes in the parent element's font size."
        },
        {
          "name": "Pixels to Ems",
          "description": "Converts pixels to em units.",
          "inputName": "Pixels",
          "inputUnit": "px",
          "outputName": "Em",
          "outputUnit": "em",
          "details": "Pixels to Em conversion is useful for web developers to maintain scalability and flexibility in their designs. Em units are based on the font size of the element, allowing for dynamic adjustments to accommodate changes in font size or layout."
        },
        {
          "name": "Line height converter",
          "description": "Converts line height values.",
          "inputName": "Line Height",
          "inputUnit": "unit",
          "outputName": "Converted Line Height",
          "outputUnit": "unit",
          "details": "Line height converter is used to adjust the spacing between lines of text. It allows developers to convert line height values between different units to ensure consistent and visually appealing typography."
        }
      ]
    },
    {
      "name": "Temperature",
      "convertors": [
        {
          "name": "Celsius to Fahrenheit",
          "description": "Converts Celsius temperatures to Fahrenheit.",
          "inputName": "Celsius",
          "inputUnit": "°C",
          "outputName": "Fahrenheit",
          "outputUnit": "°F",
          "details": "Celsius to Fahrenheit conversion is commonly used for temperature measurements. Fahrenheit is a scale commonly used in the United States, while Celsius is more widely used internationally. This conversion allows for easy understanding and comparison of temperatures across different scales."
        },
        {
          "name": "Fahrenheit to Celsius",
          "description": "Converts Fahrenheit temperatures to Celsius.",
          "inputName": "Fahrenheit",
          "inputUnit": "°F",
          "outputName": "Celsius",
          "outputUnit": "°C",
          "details": "Fahrenheit to Celsius conversion is useful for translating temperature measurements between the Fahrenheit and Celsius scales. Celsius is the standard unit of temperature measurement in most of the world, while Fahrenheit is commonly used in the United States and a few other countries."
        },
        {
          "name": "Kelvin to Celsius",
          "description": "Converts Kelvin temperatures to Celsius.",
          "inputName": "Kelvin",
          "inputUnit": "K",
          "outputName": "Celsius",
          "outputUnit": "°C",
          "details": "Kelvin to Celsius conversion is important for scientific and engineering applications. Kelvin is the base unit of temperature in the International System of Units (SI), and Celsius is derived from it. This conversion allows for easy translation between Kelvin and Celsius temperature scales."
        },
        {
          "name": "Celsius to Kelvin",
          "description": "Converts Celsius temperatures to Kelvin.",
          "inputName": "Celsius",
          "inputUnit": "°C",
          "outputName": "Kelvin",
          "outputUnit": "K",
          "details": "Celsius to Kelvin conversion is essential in scientific and engineering contexts where absolute temperature measurement is required. Kelvin is the base unit of temperature in the International System of Units (SI), and this conversion allows for easy translation between Celsius and Kelvin temperature scales."
        }
      ]
    },
    {
      "name": "Time",
      "convertors": [
        {
          "name": "Hours to Minutes",
          "description": "Converts hours to minutes.",
          "inputName": "Hours",
          "inputUnit": "hr",
          "outputName": "Minutes",
          "outputUnit": "min",
          "details": "Hours to Minutes conversion is commonly used for time calculations. This conversion allows for easy understanding and manipulation of time durations in minutes, which is a finer granularity than hours."
        },
        {
          "name": "Minutes to Seconds",
          "description": "Converts minutes to seconds.",
          "inputName": "Minutes",
          "inputUnit": "min",
          "outputName": "Seconds",
          "outputUnit": "sec",
          "details": "Minutes to Seconds conversion is useful for precise time measurements. This conversion allows for easy understanding and manipulation of time durations in seconds, which is a finer granularity than minutes."
        },
        {
          "name": "Days to Hours",
          "description": "Converts days to hours.",
          "inputName": "Days",
          "inputUnit": "days",
          "outputName": "Hours",
          "outputUnit": "hr",
          "details": "Days to Hours conversion is commonly used for time calculations. This conversion allows for easy understanding and manipulation of time durations in hours, which is a finer granularity than days."
        },
        {
          "name": "Years to Days",
          "description": "Converts years to days.",
          "inputName": "Years",
          "inputUnit": "years",
          "outputName": "Days",
          "outputUnit": "days",
          "details": "Years to Days conversion is useful for understanding and comparing longer time periods. This conversion allows for easy translation of time durations between years and days, providing a more manageable scale for certain calculations."
        },
        {
          "name": "Epoch/Unix Timestamp Converter",
          "description": "Converts Epoch/Unix timestamps.",
          "inputName": "Timestamp",
          "inputUnit": "timestamp",
          "outputName": "Converted Timestamp",
          "outputUnit": "timestamp",
          "details": "Epoch/Unix Timestamp Converter is used to translate between human-readable time formats and machine-readable timestamps. Epoch timestamps represent the number of seconds or milliseconds that have elapsed since the Unix epoch (January 1, 1970), and this conversion allows for easy interpretation and manipulation of these timestamps."
        }
      ]
    },
    {
      "name": "Length and Distance",
      "convertors": [
        {
          "name": "Inches to Centimeters",
          "description": "Converts inches to centimeters.",
          "inputName": "Inches",
          "inputUnit": "in",
          "outputName": "Centimeters",
          "outputUnit": "cm",
          "details": "Inches to Centimeters conversion is commonly used for measuring lengths. This conversion allows for easy understanding and comparison of lengths in different units."
        },
        {
          "name": "Feet to Meters",
          "description": "Converts feet to meters.",
          "inputName": "Feet",
          "inputUnit": "ft",
          "outputName": "Meters",
          "outputUnit": "m",
          "details": "Feet to Meters conversion is commonly used for measuring lengths. This conversion allows for easy understanding and comparison of lengths in different units."
        },
        {
          "name": "Miles to Kilometers",
          "description": "Converts miles to kilometers.",
          "inputName": "Miles",
          "inputUnit": "mi",
          "outputName": "Kilometers",
          "outputUnit": "km",
          "details": "Miles to Kilometers conversion is commonly used for measuring longer distances. This conversion allows for easy understanding and comparison of distances in different units."
        },
        {
          "name": "Yards to Meters",
          "description": "Converts yards to meters.",
          "inputName": "Yards",
          "inputUnit": "yd",
          "outputName": "Meters",
          "outputUnit": "m",
          "details": "Yards to Meters conversion is commonly used for measuring lengths. This conversion allows for easy understanding and comparison of lengths in different units."
        }
      ]
    },
    {
      "name": "Currency",
      "convertors": [
        {
          "name": "USD to EUR",
          "description": "Converts US Dollars to Euros.",
          "inputName": "USD",
          "inputUnit": "USD",
          "outputName": "EUR",
          "outputUnit": "EUR",
          "details": "USD to EUR conversion is commonly used for currency exchange. This conversion allows for easy understanding and comparison of currency values between US Dollars and Euros."
        },
        {
          "name": "EUR to GBP",
          "description": "Converts Euros to British Pounds.",
          "inputName": "EUR",
          "inputUnit": "EUR",
          "outputName": "GBP",
          "outputUnit": "GBP",
          "details": "EUR to GBP conversion is commonly used for currency exchange. This conversion allows for easy understanding and comparison of currency values between Euros and British Pounds."
        },
        {
          "name": "Currency Converter (customizable for multiple currencies)",
          "description": "A customizable currency converter.",
          "inputName": "Amount",
          "inputUnit": "currency",
          "outputName": "Converted Amount",
          "outputUnit": "currency",
          "details": "Currency Converter is a versatile tool for converting between different currencies. It allows users to input an amount in one currency and get the equivalent amount in another currency. This converter can be customized to support multiple currencies and exchange rates."
        }
      ]
    },
    {
      "name": "Volume",
      "convertors": [
        {
          "name": "Gallons to Liters",
          "description": "Converts gallons to liters.",
          "inputName": "Gallons",
          "inputUnit": "gal",
          "outputName": "Liters",
          "outputUnit": "L",
          "details": "Gallons to Liters conversion is commonly used for measuring liquid volumes. This conversion allows for easy understanding and comparison of volumes in different units."
        },
        {
          "name": "Liters to Milliliters",
          "description": "Converts liters to milliliters.",
          "inputName": "Liters",
          "inputUnit": "L",
          "outputName": "Milliliters",
          "outputUnit": "mL",
          "details": "Liters to Milliliters conversion is commonly used for measuring liquid volumes. This conversion allows for easy understanding and comparison of volumes in different units."
        },
        {
          "name": "Cubic Inches to Cubic Centimeters",
          "description": "Converts cubic inches to cubic centimeters.",
          "inputName": "Cubic Inches",
          "inputUnit": "in³",
          "outputName": "Cubic Centimeters",
          "outputUnit": "cm³",
          "details": "Cubic Inches to Cubic Centimeters conversion is commonly used for measuring volumes of solids. This conversion allows for easy understanding and comparison of volumes in different units."
        }
      ]
    },
    {
      "name": "Weight and Mass",
      "convertors": [
        {
          "name": "Pounds to Kilograms",
          "description": "Converts pounds to kilograms.",
          "inputName": "Pounds",
          "inputUnit": "lb",
          "outputName": "Kilograms",
          "outputUnit": "kg",
          "details": "Pounds to Kilograms conversion is commonly used for measuring weight. This conversion allows for easy understanding and comparison of weights in different units."
        },
        {
          "name": "Kilograms to Grams",
          "description": "Converts kilograms to grams.",
          "inputName": "Kilograms",
          "inputUnit": "kg",
          "outputName": "Grams",
          "outputUnit": "g",
          "details": "Kilograms to Grams conversion is commonly used for measuring mass. This conversion allows for easy understanding and comparison of masses in different units."
        },
        {
          "name": "Ounces to Grams",
          "description": "Converts ounces to grams.",
          "inputName": "Ounces",
          "inputUnit": "oz",
          "outputName": "Grams",
          "outputUnit": "g",
          "details": "Ounces to Grams conversion is commonly used for measuring mass. This conversion allows for easy understanding and comparison of masses in different units."
        }
      ]
    },
    {
      "name": "Data Storage",
      "convertors": [
        {
          "name": "Bytes to Kilobytes",
          "description": "Converts bytes to kilobytes.",
          "inputName": "Bytes",
          "inputUnit": "B",
          "outputName": "Kilobytes",
          "outputUnit": "KB",
          "details": "Bytes to Kilobytes conversion is commonly used for measuring digital storage capacity. This conversion allows for easy understanding and comparison of data storage sizes in different units."
        },
        {
          "name": "Kilobytes to Megabytes",
          "description": "Converts kilobytes to megabytes.",
          "inputName": "Kilobytes",
          "inputUnit": "KB",
          "outputName": "Megabytes",
          "outputUnit": "MB",
          "details": "Kilobytes to Megabytes conversion is commonly used for measuring digital storage capacity. This conversion allows for easy understanding and comparison of data storage sizes in different units."
        },
        {
          "name": "Megabytes to Gigabytes",
          "description": "Converts megabytes to gigabytes.",
          "inputName": "Megabytes",
          "inputUnit": "MB",
          "outputName": "Gigabytes",
          "outputUnit": "GB",
          "details": "Megabytes to Gigabytes conversion is commonly used for measuring digital storage capacity. This conversion allows for easy understanding and comparison of data storage sizes in different units."
        },
        {
          "name": "Gigabytes to Terabytes",
          "description": "Converts gigabytes to terabytes.",
          "inputName": "Gigabytes",
          "inputUnit": "GB",
          "outputName": "Terabytes",
          "outputUnit": "TB",
          "details": "Gigabytes to Terabytes conversion is commonly used for measuring digital storage capacity. This conversion allows for easy understanding and comparison of data storage sizes in different units."
        }
      ]
    },
    {
      "name": "Speed",
      "convertors": [
        {
          "name": "Miles per Hour to Kilometers per Hour",
          "description": "Converts speed from miles per hour to kilometers per hour.",
          "inputName": "Miles per Hour",
          "inputUnit": "mph",
          "outputName": "Kilometers per Hour",
          "outputUnit": "km/h",
          "details": "Miles per Hour to Kilometers per Hour conversion is commonly used for converting speed measurements. This conversion allows for easy understanding and comparison of speed values in different units."
        },
        {
          "name": "Kilometers per Hour to Meters per Second",
          "description": "Converts speed from kilometers per hour to meters per second.",
          "inputName": "Kilometers per Hour",
          "inputUnit": "km/h",
          "outputName": "Meters per Second",
          "outputUnit": "m/s",
          "details": "Kilometers per Hour to Meters per Second conversion is commonly used for converting speed measurements. This conversion allows for easy understanding and comparison of speed values in different units."
        }
      ]
    },
    {
      "name": "Energy",
      "convertors": [
        {
          "name": "Joules to Calories",
          "description": "Converts energy from joules to calories.",
          "inputName": "Joules",
          "inputUnit": "J",
          "outputName": "Calories",
          "outputUnit": "cal",
          "details": "Joules to Calories conversion is commonly used for converting energy measurements. This conversion allows for easy understanding and comparison of energy values in different units."
        },
        {
          "name": "Calories to Kilocalories",
          "description": "Converts energy from calories to kilocalories.",
          "inputName": "Calories",
          "inputUnit": "cal",
          "outputName": "Kilocalories",
          "outputUnit": "kcal",
          "details": "Calories to Kilocalories conversion is commonly used for converting energy measurements. This conversion allows for easy understanding and comparison of energy values in different units."
        },
        {
          "name": "Electronvolts to Joules",
          "description": "Converts energy from electronvolts to joules.",
          "inputName": "Electronvolts",
          "inputUnit": "eV",
          "outputName": "Joules",
          "outputUnit": "J",
          "details": "Electronvolts to Joules conversion is commonly used for converting energy measurements. This conversion allows for easy understanding and comparison of energy values in different units."
        }
      ]
    },
    {
      "name": "Area",
      "convertors": [
        {
          "name": "Square Meters to Square Feet",
          "description": "Converts area from square meters to square feet.",
          "inputName": "Square Meters",
          "inputUnit": "m²",
          "outputName": "Square Feet",
          "outputUnit": "ft²",
          "details": "Square Meters to Square Feet conversion is commonly used for converting area measurements. This conversion allows for easy understanding and comparison of area values in different units."
        },
        {
          "name": "Square Kilometers to Square Miles",
          "description": "Converts area from square kilometers to square miles.",
          "inputName": "Square Kilometers",
          "inputUnit": "km²",
          "outputName": "Square Miles",
          "outputUnit": "mi²",
          "details": "Square Kilometers to Square Miles conversion is commonly used for converting area measurements. This conversion allows for easy understanding and comparison of area values in different units."
        },
        {
          "name": "Acres to Square Meters",
          "description": "Converts area from acres to square meters.",
          "inputName": "Acres",
          "inputUnit": "acres",
          "outputName": "Square Meters",
          "outputUnit": "m²",
          "details": "Acres to Square Meters conversion is commonly used for converting area measurements. This conversion allows for easy understanding and comparison of area values in different units."
        }
      ]
    },
    {
      "name": "Angles",
      "convertors": [
        {
          "name": "Degrees to Radians",
          "description": "Converts angles from degrees to radians.",
          "inputName": "Degrees",
          "inputUnit": "°",
          "outputName": "Radians",
          "outputUnit": "rad",
          "details": "Degrees to Radians conversion is commonly used for converting angle measurements. This conversion allows for easy understanding and comparison of angle values in different units."
        },
        {
          "name": "Radians to Degrees",
          "description": "Converts angles from radians to degrees.",
          "inputName": "Radians",
          "inputUnit": "rad",
          "outputName": "Degrees",
          "outputUnit": "°",
          "details": "Radians to Degrees conversion is commonly used for converting angle measurements. This conversion allows for easy understanding and comparison of angle values in different units."
        },
        {
          "name": "Gradians to Degrees",
          "description": "Converts angles from gradians to degrees.",
          "inputName": "Gradians",
          "inputUnit": "grad",
          "outputName": "Degrees",
          "outputUnit": "°",
          "details": "Gradians to Degrees conversion is commonly used for converting angle measurements. This conversion allows for easy understanding and comparison of angle values in different units."
        }
      ]
    },
    {
      "name": "Sound",
      "convertors": [
        {
          "name": "Decibels to Watts",
          "description": "Converts sound intensity from decibels to watts.",
          "inputName": "Decibels",
          "inputUnit": "dB",
          "outputName": "Watts",
          "outputUnit": "W",
          "details": "Decibels to Watts conversion is commonly used for converting sound intensity measurements. This conversion allows for easy understanding and comparison of sound intensity values in different units."
        },
        {
          "name": "Watts to Decibels",
          "description": "Converts power from watts to decibels.",
          "inputName": "Watts",
          "inputUnit": "W",
          "outputName": "Decibels",
          "outputUnit": "dB",
          "details": "Watts to Decibels conversion is commonly used for converting power measurements. This conversion allows for easy understanding and comparison of power values in different units."
        }
      ]
    },
    {
      "name": "Photography",
      "convertors": [
        {
          "name": "Megapixels to Pixels",
          "description": "Converts resolution from megapixels to pixels.",
          "inputName": "Megapixels",
          "inputUnit": "MP",
          "outputName": "Pixels",
          "outputUnit": "px",
          "details": "Megapixels to Pixels conversion is commonly used for converting image resolution measurements. This conversion allows for easy understanding and comparison of resolution values in different units."
        },
        {
          "name": "Pixels to Megapixels",
          "description": "Converts resolution from pixels to megapixels.",
          "inputName": "Pixels",
          "inputUnit": "px",
          "outputName": "Megapixels",
          "outputUnit": "MP",
          "details": "Pixels to Megapixels conversion is commonly used for converting image resolution measurements. This conversion allows for easy understanding and comparison of resolution values in different units."
        }
      ]
    },
    {
      "name": "Fuel Efficiency",
      "convertors": [
        {
          "name": "Miles per Gallon to Liters per 100 Kilometers",
          "description": "Converts fuel efficiency from miles per gallon to liters per 100 kilometers.",
          "inputName": "Miles per Gallon",
          "inputUnit": "mpg",
          "outputName": "Liters per 100 Kilometers",
          "outputUnit": "L/100km",
          "details": "Miles per Gallon to Liters per 100 Kilometers conversion is commonly used for comparing fuel efficiency of vehicles. This conversion allows for easy understanding and comparison of fuel consumption values in different units."
        },
        {
          "name": "Liters per 100 Kilometers to Miles per Gallon",
          "description": "Converts fuel efficiency from liters per 100 kilometers to miles per gallon.",
          "inputName": "Liters per 100 Kilometers",
          "inputUnit": "L/100km",
          "outputName": "Miles per Gallon",
          "outputUnit": "mpg",
          "details": "Liters per 100 Kilometers to Miles per Gallon conversion is commonly used for comparing fuel efficiency of vehicles. This conversion allows for easy understanding and comparison of fuel consumption values in different units."
        }
      ]
    }
  ]
  constructor(private router: Router) { }

  headerConvertor(value: boolean) {
    this.isHomeHeader = value;
    window.scroll(0, 0);
  }

  setCategories(categories: Category[]): void {
    this.categories = categories;
  }

  setSelectedConvertor(convertorName: string | null): void {
    this.selectedConvertorSubject.next(convertorName);
  }

  // Method to trigger function call in ConvertorsComponent
  triggerFunctionCall(): void {
    this.callFunctionSubject.next();
  }
  goToHome() {
    this.router.navigate(['/home']);
    this.isHomeHeader = true;
  }

  goToConvertorsLista() {
    this.openConvertor = undefined;
  }
}

// Assuming that Category and Convertor are declared in the same file as PortfolioServiceService
export interface Category {
  name: string;
  convertors: Convertor[];
}

export interface Convertor {
  name: string;
  description: string;
  inputName: string; // Add the inputName property
  inputUnit: string;
  outputName: string;
  outputUnit: string;
  details: string;
}
