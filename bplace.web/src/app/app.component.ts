import { Component, OnInit } from '@angular/core';
import { Pixel } from './domains/pixel';
import { PixelsService } from './services/pixels.service';
import { Color } from './domains/color';
import { Place } from './domains/place';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bplace.web';
  pixels: Pixel[][] | undefined = undefined;
  colors = Color;
  selectedPixel: Pixel | undefined;
  loading = false;

  constructor(private pixelsService: PixelsService) { }

  ngOnInit() {
    this.loadPixels();
    interval(3000)
      .subscribe((val) => { this.loadPixels(); });
  }

  loadPixels(): void {
    this.loading = true;
    this.pixelsService.getPixels().subscribe((data: Place) => {
      if (this.pixels) {
        for (let i = 0; i < this.pixels.length; i++) {
          for (let j = 0; j < this.pixels[i].length; j++) {
            this.pixels[i][j].color = data.pixels[i][j].color;
          }
        }
      } else {
        this.pixels = data.pixels;
        for (let i = 0; i < this.pixels.length; i++) {
          for (let j = 0; j < this.pixels[i].length; j++) {
            this.pixels[i][j].x = i;
            this.pixels[i][j].y = j;
          }
        }
      }
      if (this.selectedPixel) {
        this.selectedPixel = this.pixels[this.selectedPixel.x][this.selectedPixel.y];
        this.selectedPixel.selected = true;
      }
      this.loading = false;
    }, (err) => {
      this.pixels = this.pixelsService.buildMatrix(20)
      this.loading = false;
    });
  }

  selectPixel(pixel: Pixel): void {
    if (this.selectedPixel)
      this.selectedPixel.selected = false;
    this.selectedPixel = pixel;
    this.selectedPixel.selected = true;
  }

  selectColor(color: Color): void {
    if (this.selectedPixel) {
      this.selectedPixel.color = color;
      this.selectedPixel.selected = false;
      this.pixelsService.updatePixel(this.selectedPixel.x, this.selectedPixel.y, color).subscribe((pixel: Pixel) => console.log(pixel));
      this.selectedPixel = undefined;
    }
  }

}
