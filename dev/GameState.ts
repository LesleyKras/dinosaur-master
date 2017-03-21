/// <reference path="State.ts" />
/// <reference path="InputManager.ts" />
/// <reference path="Game.ts" />
/// <reference path="Handler.ts" />
/// <reference path="T-rex.ts" />
/// <reference path="Velociraptor.ts" />
/// <reference path="Pterodactyl.ts" />

class GameState extends State{
    
    private _player: Player;
    private _enemies: Array<Enemy>;
    private _delta: Vector = new Vector();
    private _pickups: Array<Pickup>;
    
    private _level: number = 1;

    private _world: World;
    
    private _activeCamera: Camera;

    public coinArray:Array<Coin>;

    private _icon: Sprite;

    
    public backgroundMusic = new Audio("../dist/sound/Background.mp3");
    public amountOfTrex:number = Math.floor(Math.random() * (this._level * 2)) + this._level * 2;
    public amountOfVelociraptor:number = Math.floor(Math.random() * (this._level * 8)) + this._level * 3;
    public amountOfPterodactyl:number = 0;
    public amountOfCoin:number = (3 * this._level) + Math.floor(Math.random() * (this._level * 2));
    
    constructor(){
        super(); 
        
        this._world = new World();
        
        this._activeCamera = new Camera();
        Handler.setActiveCamera(this._activeCamera);
            
        this._player = new Player(Handler.game.width / 2, Handler.game.height - 66, 'charx2.png');
        Handler.setPlayer(this._player);
        
        this._activeCamera.setFollowTarget(this._player, new Vector(0, -320));
        
        this._enemies = new Array<Enemy>();
        
        Handler.setEnemies(this._enemies);

        this._pickups = new Array<Pickup>();
        
        Handler.setPickups(this._pickups);

        this.newWave();

        this._icon = new Sprite('book_icon.png', 64, 64);
        
        this.backgroundMusic.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
        }, false);

        this.backgroundMusic.volume = 0.3;

    }

    public resetGame(){
        this._player = new Player(Handler.game.width / 2, Handler.game.height - 66, 'charx2.png');
        Handler.setPlayer(this._player);

        this._activeCamera.setFollowTarget(this._player, new Vector(0, -320));
        this._enemies.length = 0;
        this._pickups.length = 0;

        this._level = 1;

        this.newWave();
    }

    private newWave(){
        console.log('wave ' + this._level);
        
        this.amountOfTrex= Math.floor(Math.random() * (this._level * 2)) + this._level * 2;
        this.amountOfVelociraptor = Math.floor(Math.random() * (this._level * 8)) + this._level * 3;

        for(let n=0; n < Math.max(this.amountOfTrex, this.amountOfPterodactyl, this.amountOfVelociraptor); n++){
            if(n < this.amountOfPterodactyl){             
                this._enemies.push(new Pterodactyl(Math.floor(Math.random() * 5000) - 5000, Math.floor(Math.random() * 100) + 1 ));
            }
            if(n < this.amountOfTrex){
                this._enemies.push(new Trex(Handler.game.width * Math.random(), Handler.world.groundLevel - 132));
                this._enemies.push(new Trex(Math.floor(Math.random() * 5000) - 5000, Handler.game.height - 163));
            }
            if(n < this.amountOfVelociraptor){
                this._enemies.push(new Velociraptor(Math.floor(Math.random() * 5000) - 5000, Handler.game.height - 90)); 
            }
        }

        this.amountOfCoin = (3 * this._level) + Math.floor(Math.random() * (this._level * 2));

        for(let n=0; n < Math.max(this.amountOfCoin); n++){
            if(n < this.amountOfCoin){
                this._pickups.push(new Coin(Handler.game.width*Math.random(), Handler.game.height - 140))
            }
        }

        console.log('enemies: ' + this._enemies.length);
    }
    
    update(){

        if(!this.eventListenersActive){
            this.addEventListeners();
        }
        
        this._activeCamera.update();
        this._world.update();
 
        this._player.update();
        for(let n=0; n<this._enemies.length; n++){
            this._enemies[n].update();
            this._delta.x = this._enemies[n].center.x - this._player.center.x;
            this._delta.y = this._enemies[n].center.y - this._player.center.y;
            if(this._delta.mag() < 250){
                this._enemies[n].inRange = true;
            } else {
                this._enemies[n].inRange = false;
            }
            if(this._enemies[n].inRange){
                this.checkCollision(this._enemies[n]);
            }
            
            if(this._delta.mag() < Handler.player.attackRange){
                if((this._enemies[n].center.x - Handler.player.center.x > 0 && Handler.player.direction > 0) ||
                    this._enemies[n].center.x - Handler.player.center.x < 0 && Handler.player.direction < 0){
                        this._enemies[n].inAttackRange = true;
                    } else {
                        this._enemies[n].inAttackRange = false;
                    }
            } else {
                this._enemies[n].inAttackRange = false;
            }
            
            for(let n=this._enemies.length; n>0; n--){
                if(!this._enemies[n-1].isAlive){

                    let random = Math.random();

                    if (random < 0.2)
                    this._pickups.push(new Meat(this._enemies[n-1].position.x, this._enemies[n-1].position.y + 65));
                    
                    this._enemies.splice(n-1, 1);
                    console.log(this._enemies.length);
                    
                    if(this._enemies.length <= 0){
                        this._level++;
                        this.newWave();
                    }
                }
            }
            
        }

        for(let n=0; n<this._pickups.length; n++){
            this._pickups[n].update();
            this._delta.x = this._pickups[n].center.x - this._player.center.x;
            this._delta.y = this._pickups[n].center.y - this._player.center.y;
            if(this._delta.mag() < 24){
                this._pickups[n].inRange = true;
                
            } else {
                this._pickups[n].inRange = false;
            }
            if(this._pickups[n].inRange){
                this.checkPickupCollision(this._pickups[n]);
            }
        }

        for(let n=this._pickups.length; n > 0; n--){
            if (this._pickups[n-1].isPickedup){
                this._pickups.splice(n-1,1);
            }
        }
    }
    
    private checkCollision(entity: Entity){
        if(this._player.position.x + this._player.CollisionBox.offsetX + this._player.CollisionBox.width > entity.position.x + entity.CollisionBox.offsetX &&
            this._player.position.x + this._player.CollisionBox.offsetX < entity.position.x + entity.CollisionBox.offsetX + entity.CollisionBox.width && 
            this._player.position.y + this._player.CollisionBox.offsetY +this._player.CollisionBox.height > entity.position.y + entity.CollisionBox.offsetY &&
            this._player.position.y + this._player.CollisionBox.offsetY < entity.position.y + entity.CollisionBox.offsetY + entity.CollisionBox.height ) 
        {
            Handler.player.pushBack(entity);
        }

    }

    private checkPickupCollision(pickup: Pickup){
        if(this._player.position.x + this._player.CollisionBox.offsetX + this._player.CollisionBox.width > pickup.position.x + pickup.CollisionBox.offsetX &&
            this._player.position.x + this._player.CollisionBox.offsetX < pickup.position.x + pickup.CollisionBox.offsetX + pickup.CollisionBox.width && 
            this._player.position.y + this._player.CollisionBox.offsetY +this._player.CollisionBox.height > pickup.position.y + pickup.CollisionBox.offsetY &&
            this._player.position.y + this._player.CollisionBox.offsetY < pickup.position.y + pickup.CollisionBox.offsetY + pickup.CollisionBox.height)
            {
                if(!pickup.isPickedup)  {
                    pickup.isPickedup = true;
                    pickup.handlePickup();
                }
            }
    }
    
    draw(){
        Handler.renderer.clearRect(0,0, Handler.game.width, Handler.game.height);
        
        this._world.draw();
        
        for(let n=0; n < this._enemies.length; n++){
            this._enemies[n].draw();
        }     

        for(let n=0; n < this._pickups.length; n++){
            this._pickups[n].draw();
        }     
        
        if(!this._player.isAlive){
            Handler.renderer.fillStyle = 'black';
            Handler.renderer.fillRect(0, 0, Handler.game.width, Handler.game.height);
        }

        this._player.draw();
        if(this._player.isHit){
            Display.screenFlash();
        }
        
        Handler.renderer.fillStyle = 'black';
        Handler.renderer.fillRect(50, 50, Handler.player.maxHealth * 2 + 4, 18);
        Handler.renderer.fillStyle = 'red';
        Handler.renderer.fillRect(52, 52, Handler.player.health * 2, 14);

        
        if(this._player.isAlive){
            Handler.renderer.drawImage(this._icon.spriteSheet, Handler.game.width - 100, 30);
        }
        Handler.renderer.fillStyle = 'white';
        Handler.renderer.textAlign = 'center';
        Handler.renderer.font = '16px pixel';
        Handler.renderer.fillText('Score: ' + Handler.player.score, Handler.game.width / 2, 50);
        Handler.renderer.fillText('Level: ' + this._level, Handler.game.width / 2 - 100, 80);
        Handler.renderer.fillText('Dinosaurussen: ' + this._enemies.length, Handler.game.width / 2 + 100, 80);
        
        if(Handler.game.debugMode){
            Debug.draw();
        }
        
    }

    private _pause = (ev: KeyboardEvent) => {
        if(ev.keyCode == Keys.ESC){
            StateManager.setState(Handler.game.pauseState);
            this.removeEventListeners();
        }
    }
    
    
    private _toLogbook = (ev:KeyboardEvent) => {
        if(ev.keyCode == Keys.B){
            StateManager.setState(Handler.game.logbookState);
            this.removeEventListeners();
        }
    }
    
    addEventListeners(){
        document.addEventListener('keydown', this._pause);
        document.addEventListener('keydown', this._toLogbook);
        document.addEventListener('keyup', Handler.game.toggleDebugMode);
        this.backgroundMusic.play();

        this.eventListenersActive = true;
    }
    
    removeEventListeners(){
        document.removeEventListener('keydown', this._pause);
        document.removeEventListener('keydown', this._toLogbook);
        document.removeEventListener('keyup', Handler.game.toggleDebugMode);
        this.backgroundMusic.pause();
        this.eventListenersActive = false;
    } 
}    