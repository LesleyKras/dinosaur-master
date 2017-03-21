/// <reference path="GameObject.ts" />
/// <reference path="Vector.ts" />
/// <reference path="Sprite.ts" />


/**
 * Entity extends GameObject
 */
class Entity extends GameObject {
    
    public health:number;
    public maxHealth:number;
    public counter:number;
    public isMoving:boolean;
    public movingDirection:string;
    public counterTime:number;
    
    protected _isAlive: boolean = true;
    
    protected _width: number = 0;
    protected _height: number = 0;
    protected _center: Vector;
    
    public CollisionBox: CollisionBox;
    
    protected _sprite: Sprite;
    
    public speed:number = 0.4;
    public velocity:Vector;
    
    constructor(xPos:number, yPos:number) {
        super(xPos, yPos);
        this.velocity = new Vector(0,0);
        this.isMoving = false;
        this.counter = 0;
        this.health = 100;
        this.maxHealth = 100;
        this.counterTime = Math.floor(Math.random() * 200) + 100;
    }
    
    public setSprite(filename: string, width:number, height:number){
        this._sprite = new Sprite(filename, width, height);
        this._width = width;
        this._height = height;
        this._center = new Vector(this.position.x + width / 2, this.position.y + height / 2);
    }
    
    public move = () => {
        this.counter ++
        
        if (this.counter === this.counterTime) {
            let randomNumber = Math.floor(Math.random() * 10) + 1;
            
            if(randomNumber <= 5){
                this.isMoving = true;
                this.movingDirection = "right";
                this.velocity.x = this.speed;
                this.counter = 0;
            }
            else if(randomNumber <= 10){
                this.isMoving = true;
                this.movingDirection = "left";
                this.velocity.x = -this.speed;
                this.counter = 0;
            }
            else {
                this.isMoving = false;
            }
            
            
            this.counter = 0;
        }
        
        this.position.add(this.velocity);
        
    }
    
    public showHealth = () => {

    }
    
    get isAlive(){return this._isAlive};
    get width(){return this._width};
    get height(){return this._height};
    get center(){
        this._center.x = this.position.x + this.CollisionBox.width / 2 + this.CollisionBox.offsetX;
        this._center.y = this.position.y + this.CollisionBox.height / 2 + this.CollisionBox.offsetY;
        // this._center.x = this.position.x + this._width / 2;
        // this._center.y = this.position.y + this._height / 2;
        return this._center};
   
}