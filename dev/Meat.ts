/// <reference path="GameObject.ts" />
/// <reference path="Vector.ts" />
/// <reference path="Pickup.ts" />
/// <reference path="CollisionBox.ts" />

/**
 * Meat
 */
class Meat extends Pickup {
    
private counter:number;

    constructor(xPos,yPos) {
        super(xPos,yPos);
        this._sprite = new Sprite("Meat.png", 32, 32);
        this._width = 32;
        this._height = 32;
        this._sprite.index.x = 0;
        this._sprite.index.y = 0;
        this.CollisionBox = new CollisionBox(32,32,0,0);
        this.counter = 0;
    }

    public handlePickup(){

        if (Handler.player.health < 100)    {
        Handler.player.health += 50;
        if (Handler.player.health > 100) {
            Handler.player.health = 100;
        }
        console.log("HP up");
        
        }
    }
}