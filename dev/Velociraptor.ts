/// <reference path="Enemy.ts" />


/**
 * Velociraptor extends Entity
 */
class Velociraptor extends Enemy {
    
    private _lastVelocityX
    private velociraptorSound = new Audio("../dist/sound/velociraptorSound.mp3");
    
    
    constructor(xPos:number, yPos:number) {
        super(xPos, yPos);
        this.counter = this.counterTime - 1;
        this.speed = 3;
        // this.sprite = new Sprite("Velociraptor.png", 84, 51);
        this.setSprite("Velociraptor.png", 84, 51);
        this.CollisionBox = new CollisionBox(40, 43, 23, 4);
        this._sprite.index.x = 0;
        this._sprite.index.y = 0;
        this.maxHealth = 80;
        this.health = 80;
        this._score = 5;
        
        this._name = 'Velociraptor';
        this.addInfo();
    }

    protected addInfo(){
        this._info.push(
            'De velociraptor was een klein roofdier van ruim twee meter lang.', 
            'Hij liep op zijn achterpoten, was warmbloedig en had een soort vleugels.', 
            'Anders dan de meeste vogels had hij tanden in zijn bek en een lange staart', 
            'Een volwassen velociraptor was veel te zwaar om te kunnen vliegen.');
    }
    
    update = () => {
                this.move();
        
        if(this.isMoving && this.movingDirection === "right" && this.counter % 4 == 0){
            if(this._sprite.index.y == 1){
                this._sprite.index.y = 0;
            }
                   
            if(this._sprite.index.x == 5){
                this._sprite.index.y = 0;
                this._sprite.index.x = 0;
            }
            
            
            this._sprite.index.x ++;

           
        }
        
        else if(this.isMoving && this.movingDirection === "left" && this.counter % 4 == 0){
         if(this._sprite.index.y == 0){
                this._sprite.index.y = 1;
            }
                       
            if(this._sprite.index.x == 5){
                this._sprite.index.x = 0;
            }
            
            this._sprite.index.x ++;

        }
        
        if(this.inAttackRange && Handler.player.isAttacking && !this._isHit){
            this._isHit = true;
            this._lastVelocityX = this.velocity.x;
            this.velocity.y = -20;
            if(this._center.x < Handler.player.center.x){
                this.velocity.x = -10;
            } else {
                this.velocity.x = 10;
            }
        }
        
        if(this._isHit){
            this.health -= 1;
            if(this.health <= 0){
                this.health = 0;
                this._isAlive = false;
                Handler.player.addScore(this._score);
                this.velociraptorSound.play();

            }
            if(this.position.y + this._height < Handler.world.groundLevel && !(this.position.y + this._height >= Handler.world.groundLevel)){
                this.velocity.y += 2;
            }
            else if(this.position.y + this._height >= Handler.world.groundLevel)
            {
                this.velocity.y = 0;
                this.velocity.x = this._lastVelocityX;
                this.position.y = Handler.world.groundLevel - this._height - 1;
                this._isHit = false;
            }
        }

        if(this.position.x < -2.7 * Handler.game.width){
            this.position.x = -2.7 * Handler.game.width;
        } else if (this.position.x > 2.7 * Handler.game.width){
            this.position.x = 2.7 * Handler.game.width;
        }
    }

}