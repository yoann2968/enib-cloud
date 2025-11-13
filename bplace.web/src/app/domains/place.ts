import { Pixel } from "./pixel";

export class Place {
    public pixels: Pixel[][];

    constructor(pixels: Pixel[][]) { 
        this.pixels = pixels;
    }
}
