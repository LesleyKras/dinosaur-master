/// <reference path="Entity.ts" />
/// <reference path="Sprite.ts" />
/// <reference path="Vector.ts" />
/// <reference path="Enemy.ts" />


/**
 * Trex extends Entity
 */
class Trex extends Enemy {
    
    private _lastVelocityX: number;
    private trexGrowl = new Audio("../dist/sound/dinoGrowl.wav");

    
    constructor(xPos:number, yPos:number) {
        super(xPos,yPos);
        this.counter = this.counterTime - 1;
        this.speed = 1.5;
        this.setSprite("Trex.png", 252, 131);
        this._sprite.index.x = 0;
        this._sprite.index.y = 0;       
        this.CollisionBox = new CollisionBox(70, 110, 80, 30);
        this.maxHealth = 120;
        this.health = this.maxHealth;
        this._score = 8;

        this._name = 'T-Rex';
        this.addInfo();
    }

    protected addInfo(){
        this._info.push(
            'De T-rex is de grootste dinosaurus en tevens het grootste landdier dat ooit bestaan heeft.', 
            'Het was een vleeseter dat graag op graseters jaagde.', 
            'Zo heeft hij hele gespierde achterpoten en hele korte slappe voorpoten.', 
            'Het was een warmbloedig dier dat in elk klimaat kan overleven.');
    }

    public update = () => {
        
        if(!this._isAlive){
            return;
        }

        this.move();
        
        if(this.isMoving && this.movingDirection === "right" && this.counter % 10 == 0){
            if(this._sprite.index.y == 2 || this._sprite.index.y == 3){
                this._sprite.index.y = 0;
            }
            
            this._sprite.index.x ++;
            
            if(this._sprite.index.x == 3){
                if(this._sprite.index.y == 0 || this._sprite.index.y == 2 || this._sprite.index.y == 3){
                    this._sprite.index.y = 1;
                }
                else if(this._sprite.index.y == 1){
                    this._sprite.index.y = 0;
                }
                this._sprite.index.x = 0;
            }  
        }
        else if(this.isMoving && this.movingDirection === "left" && this.counter % 10 == 0){
            if(this._sprite.index.y == 0 || this._sprite.index.y == 1){
                this._sprite.index.y = 2;
            }
            this._sprite.index.x ++;
            
            if(this._sprite.index.x == 3){
                if(this._sprite.index.y == 2){
                    this._sprite.index.y = 3;
                }
                else if(this._sprite.index.y == 3){
                    this._sprite.index.y = 2;
                }
                this._sprite.index.x = 0;
            }
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
                this.trexGrowl.play();
                Handler.player.addScore(this._score);
                this._isAlive = false;
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