/// <reference path="Vector.ts" />


/**
 * GameObject
 */
class GameObject {
    
    public position:Vector;
    
    constructor(xPos:number, yPos:number) {
        this.position = new Vector(xPos,yPos);
    }
    
    public update = () => {
        
    }
}