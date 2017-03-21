/// <reference path="GameObject.ts" />
/// <reference path="Vector.ts" />
/// <reference path="Pickup.ts" />
/// <reference path="CollisionBox.ts" />



/**
 * Coin
 */
class Coin extends Pickup {
    
    private counter:number;
    
    constructor(xPos, yPos) {
        super(xPos,yPos);
        this._sprite = new Sprite("Coin.png", 16, 16);
        this._width = 16;
        this._height = 16;
        this._sprite.index.x = 0;
        this._sprite.index.y = 0;
        this.CollisionBox = new CollisionBox(16,16,0,0);
        this.counter = 0;
    }

    public update = () => {
        this.counter++;
                
        if(this.counter % 8 == 0){
            this._sprite.index.x++;
                if(this._sprite.index.x > 11)
                {
                this._sprite.index.x = 0;
                }
        }

    }

    public handlePickup(){

        Handler.player.coins += 1;
        Handler.player.addScore(1);
        console.log("De speler heeft " + Handler.player.coins + " coins");

    }

}
