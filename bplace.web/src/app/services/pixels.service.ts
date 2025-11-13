import { Injectable } from '@angular/core';
import { Color } from '../domains/color';
import { Pixel } from '../domains/pixel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Place } from '../domains/place';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PixelsService {

  private pixels: Pixel[][];

  constructor(private http: HttpClient) {
    this.pixels = this.buildMatrix(20);
  }

  public buildMatrix(size: number): Pixel[][] {
    const pixels: Pixel[][] = [];
    for (let i = 0; i < size; i++) {
      const line: Pixel[] = [];
      pixels.push(line);
      for (let j = 0; j < size; j++) {
        line.push(new Pixel("init", Color.Black));
      }
    }

    return pixels;
  }

  getRandomColor(): Color {
    const colors = Object.values(Color);
    var key = Math.floor(Math.random() * Object.keys(colors).length );
    return colors[key];
  }

  public getPixels() {
    return this.http.get<Place>('api/place/1')
  }

  public updatePixel(x: number, y: number, color: Color) {
    return this.http.post<Pixel>('api/place/1/pixel?x=' + x + '&y=' + y, new Pixel("bob", color));
  }

}
