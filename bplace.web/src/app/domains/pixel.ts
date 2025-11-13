import { Color } from "./color";

export class Pixel {
    public owner: string;
    public color: Color;
    public selected: Boolean;
    public x: number = 0;
    public y: number = 0;

    constructor(owner: string, color: Color) { 
        this.color = color;
        this.owner = owner;
        this.selected = false;
    }
}
