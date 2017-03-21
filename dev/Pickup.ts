/// <reference path="GameObject.ts" />
/// <reference path="Player.ts" />
/// <reference path="Handler.ts" />
/// <reference path="Vector.ts" />
/// <reference path="CollisionBox.ts" />

class Pickup extends GameObject {
    
    protected _width:number;
    protected _height:number;
    protected _center: Vector;
    public isPickedup: boolean = false;
    
    public _sprite: Sprite;
    public CollisionBox: CollisionBox;
    public inRange: boolean = false;
    
    constructor(xPos, yPos) {
        super(xPos, yPos);
        
        this._center = new Vector(0,0);
        
    }

    public handlePickup() {};

    draw(){
        Handler.renderer.drawImage(
                this._sprite.spriteSheet,
                this._sprite.index.x * this._sprite.width,
                this._sprite.index.y * this._sprite.height,
                this._sprite.width,
                this._sprite.height,
                this.position.x - Handler.activeCamera.position.x, 
                this.position.y - Handler.activeCamera.position.y,
                this._sprite.width,
                this._sprite.height);
    }
    
    drawCollision(){
        Handler.renderer.fillStyle = 'rgba(255, 0, 0, .4)';
            Handler.renderer.fillRect(
                this.position.x + this.CollisionBox.offsetX - Handler.activeCamera.position.x, 
                this.position.y + this.CollisionBox.offsetY - Handler.activeCamera.position.y, 
                this.CollisionBox.width, 
                this.CollisionBox.height);
    }

    get width(){return this._width};
    get height(){return this._height};
    get center(){
        this._center.x = this.position.x + this._width / 2;
        this._center.y = this.position.y + this._height / 2;
        return this._center};
}