/// <reference path="Entity.ts" />

/**
 * Enemy extends Entity
 */
class Enemy extends Entity {

    protected _name: string;
    protected _info: Array<string> = new Array<string>();
    protected _score: number;

    public inRange: boolean = false;
    public inAttackRange: boolean = false;
    
    protected _isHit: boolean = false;
    
    constructor(xPos:number, yPos:number) {
        super(xPos, yPos);
    }

    protected addInfo(){

    }
    
    draw(){
        if(!this._isAlive){
            return;
        }
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
                
                if(this.health < this.maxHealth){
                    Handler.renderer.fillStyle = "red";
                    Handler.renderer.strokeStyle = "10px solid black";
                    Handler.renderer.strokeRect(this.position.x + this._sprite.width / 2 - this.maxHealth - Handler.activeCamera.position.x, this.position.y - 20 - Handler.activeCamera.position.y, this.health * 1.5, 10);
                    Handler.renderer.fillRect(this.position.x + this._sprite.width / 2 - this.maxHealth - Handler.activeCamera.position.x, this.position.y - 20 - Handler.activeCamera.position.y, this.health * 1.5 , 10);
                }
    }
    
    drawCollision(){
        Handler.renderer.fillStyle = 'rgba(255, 0, 0, .4)';
            Handler.renderer.fillRect(
                this.position.x + this.CollisionBox.offsetX - Handler.activeCamera.position.x, 
                this.position.y + this.CollisionBox.offsetY - Handler.activeCamera.position.y, 
                this.CollisionBox.width, 
                this.CollisionBox.height);
    }

    get name(){return this._name};
    get info(){return this._info};
}