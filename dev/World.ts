/// <reference path="Assets.ts" />
/// <reference path="Player.ts" />



class World {
    
    private _background: Sprite;
    private _bg1: Vector;
    private _bg2: Vector;
    
    private _groundLevel: number = Handler.game.height - 35;
    
    constructor(){
        this._background = new Sprite('background.png', 560, 272);
        this._bg1 = new Vector(0,0);
        this._bg2 = new Vector(Handler.game.width, 0);
        Handler.setWorld(this);
    }
    
    update(){
        if(this._bg1.x - Handler.activeCamera.position.x < -Handler.game.width){
            this._bg1.x += 2* Handler.game.width;
        } 
        else if(this._bg1.x - Handler.activeCamera.position.x >= Handler.game.width) {
            this._bg1.x -= 2* Handler.game.width;
        }
        
        if(this._bg2.x - Handler.activeCamera.position.x < -Handler.game.width){
            this._bg2.x += 2* Handler.game.width;
        } 
        else if(this._bg2.x - Handler.activeCamera.position.x > Handler.game.width) {
            this._bg2.x -= 2* Handler.game.width;
        }
        
        
    }
    
    draw(){
        Handler.renderer.drawImage(
            this._background.spriteSheet,
            this._bg1.x - Handler.activeCamera.position.x,
            this._bg1.y - Handler.activeCamera.position.y,
            Handler.game.width,
            Handler.game.height
        )
        
        Handler.renderer.drawImage(
            this._background.spriteSheet,
            this._bg2.x - Handler.activeCamera.position.x,
            this._bg2.y - Handler.activeCamera.position.y,
            Handler.game.width,
            Handler.game.height
        )
    }
    
    get groundLevel(){return this._groundLevel};
   
}