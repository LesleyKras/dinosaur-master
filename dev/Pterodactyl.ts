/**
 * Pterodactyl extends Enemy
 */
class Pterodactyl extends Enemy {
    constructor(xPos:number, yPos:number) {
        super(xPos, yPos);
        this.counter = this.counterTime - 1;
        this.speed = 0.8;
        // this.sprite = new Sprite("Pterodactyl.png", 96, 96);
        this.setSprite("Pterodactyl.png", 96, 96);
        this.CollisionBox = new CollisionBox(this._width, this._height, 0, 0);
        this._sprite.index.x = 0;
        this._sprite.index.y = 0;     
    }
    
        update = () => {
                this.move();
        
        if(this.isMoving && this.movingDirection === "right" && this.counter % 8 == 0){
            if(this._sprite.index.y == 2 || this._sprite.index.y == 3){
                this._sprite.index.y = 0;
            }
                   
            if(this._sprite.index.x == 5){
                this._sprite.index.y = 1;
                this._sprite.index.x = 0
                
            }
            
            this._sprite.index.x ++;

            if(this._sprite.index.x == 3 && this._sprite.index.y == 1){
                this._sprite.index.y = 0;
                this._sprite.index.x = 0;
                } 
        }
        
        else if(this.isMoving && this.movingDirection === "left" && this.counter % 8 == 0){
         if(this._sprite.index.y == 0 || this._sprite.index.y == 1){
                this._sprite.index.y = 2;
            }
                       
            if(this._sprite.index.x == 5){
                this._sprite.index.y = 3;
                this._sprite.index.x = 0
            }
            
            this._sprite.index.x ++;
            
            if(this._sprite.index.x == 3 && this._sprite.index.y == 3){
                this._sprite.index.y = 2;
                this._sprite.index.x = 0;
            }

        }
    }
}