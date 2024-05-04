import { Component, AfterViewInit, ElementRef } from '@angular/core';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements AfterViewInit {
  data = [
    {
      imageUrl: 'assets/photoProject/1.jpeg',
      alt: 'Image 1'
    },
    {
      imageUrl: 'assets/photoProject/2.jpeg',
      alt: 'Image 2'
    },
    {
      imageUrl: 'assets/photoProject/3.jpeg',
      alt: 'Image 1'
    },
    {
      imageUrl: 'assets/photoProject/4.jpeg',
      alt: 'Image 1'
    },
    {
      imageUrl: 'assets/photoProject/5.jpeg',
      alt: 'Image 1'
    },
    {
      imageUrl: 'assets/photoProject/6.jpeg',
      alt: 'Image 1'
    },
    {
      imageUrl: 'assets/photoProject/7.jpeg',
      alt: 'Image 1'
    },
    {
      imageUrl: 'assets/photoProject/8.jpeg',
      alt: 'Image 1'
    },
    {
      imageUrl: 'assets/photoProject/9.jpeg',
      alt: 'Image 1'
    },
    {
      imageUrl: 'assets/photoProject/15.jpeg',
      alt: 'Image 1'
    },
    {
      imageUrl: 'assets/photoProject/10.jpeg',
      alt: 'Image 1'
    },
    {
      imageUrl: 'assets/photoProject/11.jpeg',
      alt: 'Image 1'
    },
    {
      imageUrl: 'assets/photoProject/12.jpeg',
      alt: 'Image 1'
    },
    {
      imageUrl: 'assets/photoProject/13.jpeg',
      alt: 'Image 1'
    },
  ]

  grid: Masonry | undefined; // Define grid as Masonry or undefined
  constructor(private elementRef: ElementRef) { }


  ngAfterViewInit() {
    const gridElement = this.elementRef.nativeElement.querySelector('.row');
    this.grid = new Masonry(gridElement, {
      itemSelector: '.col-md-3',
      columnWidth: '.col-md-3',
      percentPosition: true
    });

    imagesLoaded(gridElement).on('always', () => {
      if (this.grid) {
        // Recreate Masonry instance with updated items
        // this.grid.destroy();
        this.grid = new Masonry(gridElement, {
          itemSelector: '.col-md-3',
          columnWidth: '.col-md-3',
          percentPosition: true
        });
      }
    });
  }
}
