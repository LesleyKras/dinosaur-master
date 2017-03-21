/// <reference path="Vector.ts" />


/**
 * Sprite
 */
class Sprite {
    
    public spriteSheet:HTMLImageElement;
    public index:Vector;
    public width:number;
    public height:number;
    
    constructor(fileName:string, width:number, height: number) {
        let image = new Image();
        let path = "img/"+fileName;
        image.src = path;
        
        this.spriteSheet = image;
        this.index = new Vector(0,0);
        this.width = width;
        this.height = height;
    }
}