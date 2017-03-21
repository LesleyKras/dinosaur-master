/// <reference path="Entity.ts" />
/// <reference path="Vector.ts" />
/// <reference path="InputManager.ts" />
/// <reference path="Handler.ts" />

class Player extends Entity {
    
    private _direction: number = 1;
    private _onGround: boolean = false;
    private _isHit: boolean = false;

    
    private _animator: Animator;
    private PlayerArm:PlayerArm;

    private _sword: Sword;
    private swordSound = new Audio("../dist/sound/swordSound.wav");

    public coins:number;

    private _score: number = 0;
    
    //temp
    private _groundLevel: number = Handler.game.height - 35;
    
    private _speed: number = 5;
    
    private _isJumping: boolean = false;
    private jumpSound = new Audio("../dist/sound/jump.ogg");
    
    private _attackDelay: number = 24;
    private _attackLength: number = 20;
    private _attackTimer: number = 0;
    private _delayTimer: number = 0;
    
    private _isAttacking: boolean = false;
    
    private _attackRange: number = 100;
    private _canAttack: boolean = true;
    
    //animations
    private _walkingRight = new Animation(new Vector(0,0), new Vector(1,0));
    private _walkingLeft = new Animation(new Vector(4, 0), new Vector(5,0));
    private _jumpingRight = new Animation(new Vector(2,0));
    private _jumpingLeft = new Animation(new Vector(0,1));
    private _attackingLeft = new Animation(new Vector(5,1));
    private _attackingRight = new Animation(new Vector(4,1));
    private _dying = new Animation(new Vector(1,1), new Vector(2,1), new Vector(3,1));
    
    constructor(x: number, y:number, imgFilename: string){
        super(x, y);
        this.maxHealth = 100;
        this.health = 100;
        this.velocity = new Vector(0, 0);
        this.CollisionBox = new CollisionBox(24, 44, 36, 20);
        this.setSprite(imgFilename, 64, 64)
        this._animator = new Animator();
        this._animator.setAnimation(this._walkingRight);
        this.PlayerArm = new PlayerArm();

        this._sword = new Sword();

        this.coins = 0;


    }
    
    get isHit(){return this._isHit};
    get onGround(){return this._onGround};
    get attackRange(){return this._attackRange};
    get isAttacking(){return this._isAttacking};
    get direction(){return this._direction};
    get canAttack(){return this._canAttack};
    get score(){return this._score};
    
    private _move = () => {
        if(!this._isHit){
            if(InputManager.keyPressed(Keys.A) || InputManager.keyPressed(Keys.LEFT)){
                this.velocity.x = -this._speed;
                this._direction = -1;
                if(this._animator.currentAnimation != this._walkingLeft && !this._isJumping && !this._isAttacking){
                    this._animator.setAnimation(this._walkingLeft);
                    this.CollisionBox.offsetX = 36;
                }
            }
            if(InputManager.keyPressed(Keys.D) || InputManager.keyPressed(Keys.RIGHT)){
                this.velocity.x = this._speed;
                this._direction = 1;
                if(this._animator.currentAnimation != this._walkingRight && !this._isJumping && !this._isAttacking){
                    this._animator.setAnimation(this._walkingRight);
                    this.CollisionBox.offsetX = 0;
                }
            }
        }
        
    }
    
    private _getDamage(dmg: number){
        if(this._isAlive){
            this.health -= dmg;
            if(this.health <= 0){
                this.health = 0;
                this._isAlive = false;
            }
        }
    }
    
    private _jump = () => {
        if(!this._isJumping || this._isHit){
            
            if(this._direction < 0){
                this._animator.setAnimation(this._jumpingLeft);
                this.CollisionBox.offsetX = 36;
            } else {
                this._animator.setAnimation(this._jumpingRight);
                this.CollisionBox.offsetX = 0;
            }
            
            this._isJumping = true;
            this._onGround = false;            
            this.velocity.y = -10;
            this.jumpSound.play();
            
        }
    }

    public addScore(n: number){
        this._score += n;
    }
    
    private _attack = () => {
        
        if(!this._isAttacking){
            this._attackTimer = this._attackLength;
            this._isAttacking = true;
            this._canAttack = false;
            if(this._direction < 0){
                this._animator.setAnimation(this._attackingLeft);
                this.CollisionBox.offsetX = 36;
            }
            else{
                this._animator.setAnimation(this._attackingRight);
                this.CollisionBox.offsetX = 0;
                this.swordSound.play();
            }
        }
    }
    
    public pushBack(entity: Entity){
        if(this._isAlive){
            if(!this._isHit){
                this._isHit = true;
                this._getDamage(10);
            if(this.center.x  < entity.center.x){
                this.velocity.x = -5;
            } else if (this.center.x  > entity.center.x) {
                this.velocity.x = 5;
            }
            this._jump();
            }
        }
    }
    
    public update = () => {

        if((InputManager.keyPressed(Keys.A) || InputManager.keyPressed(Keys.D) ||
            InputManager.keyPressed(Keys.LEFT) || InputManager.keyPressed(Keys.RIGHT)) && this._isAlive)
        {
            this._move();
            this._animator.update();
        } 
        else {
            if(!this._isJumping)
                this.velocity.x = 0;
            if(this._animator.index != 0 && this._isAlive){
                this._animator.resetAnimation();
            }
        }
        
        if(InputManager.keyPressed(Keys.SPACE) && this._isAlive && this._canAttack){
            this._attack();
        }
        
        if(this._isAttacking && this._attackTimer >= 0){
            this._attackTimer--;
            if(this._attackTimer <= 0){
                this._isAttacking = false;
                if(this._direction < 0){
                    this._animator.setAnimation(this._walkingLeft);
                    this.CollisionBox.offsetX = 36;
                }
                else {
                    this._animator.setAnimation(this._walkingRight);
                    this.CollisionBox.offsetX = 0;
                }
                this._delayTimer = this._attackDelay;
            }
        } 
        if(this._delayTimer > 0){
            this._delayTimer--;
            if(this._delayTimer <= 1){
                this._canAttack = true;
            }
        }
        
        if(InputManager.keyPressed(Keys.W) || InputManager.keyPressed(Keys.UP)){
            if(this._onGround && this._isAlive)
                this._jump();
        }
        
        
        if(!this._onGround){
            if(this.velocity.y < this._speed){
                this.velocity.y += 0.5;
            }
            
            if(this.position.y + this._height > Handler.world.groundLevel){
                this._onGround = true;
                this._isJumping = false;
                this._isHit = false;
                Display._flashTime = 50;
                this.velocity.y = 0;
                this.position.y = Handler.world.groundLevel - this._height;
                
                if(this._direction < 0){
                    this._animator.setAnimation(this._walkingLeft);
                    this.CollisionBox.offsetX = 36;
                } else {
                    this._animator.setAnimation(this._walkingRight);
                    this.CollisionBox.offsetX = 0;
                }
            }
        }
        
        this.position.add(this.velocity);
        
        if(!this._isAlive && this._onGround){
            if(this._animator.currentAnimation != this._dying){
                this._animator.setAnimation(this._dying);
                this._animator.resetAnimation();
            }
            else if (this._animator.currentAnimationFrame.x != 2){
                this._animator.update();
            }
        }

        if(this.position.x < -3 * Handler.game.width){
            this.position.x = 3 * Handler.game.width;
        } else if (this.position.x > 3 * Handler.game.width){
            this.position.x = -3 * Handler.game.width;
        }
    }
    
    draw = () => {
     Handler.renderer.drawImage(
        this._sprite.spriteSheet, 
        this._animator.currentAnimationFrame.x * this._sprite.width,
        this._animator.currentAnimationFrame.y * this._sprite.height,
        this._sprite.width,
        this._sprite.height,
        this.position.x - Handler.activeCamera.position.x,
        this.position.y - Handler.activeCamera.position.y,
        this._sprite.width,
        this._sprite.height);
            
    Handler.renderer.drawImage(
        this.PlayerArm._sprite.spriteSheet, 
        this._animator.currentAnimationFrame.x * this.PlayerArm._sprite.width,
        this._animator.currentAnimationFrame.y * this.PlayerArm._sprite.height,
        this.PlayerArm._sprite.width,
        this.PlayerArm._sprite.height,
        this.position.x - Handler.activeCamera.position.x,
        this.position.y - Handler.activeCamera.position.y,
        this.PlayerArm._sprite.width,
        this.PlayerArm._sprite.height); 
        
        Handler.renderer.drawImage(
        this._sword.sprite.spriteSheet, 
        this._animator.currentAnimationFrame.x * this._sword.sprite.width,
        this._animator.currentAnimationFrame.y * this._sword.sprite.height,
        this._sword.sprite.width,
        this._sword.sprite.height,
        this.position.x - Handler.activeCamera.position.x,
        this.position.y - Handler.activeCamera.position.y,
        this._sword.sprite.width,
        this._sword.sprite.height); 
    
    }
    
    
}
