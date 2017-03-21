/// <reference path="Game.ts" />
/// <reference path="Vector.ts" />


class Animator {
    
    private _currentAnimationFrame: Vector;
    private _currentAnimation: Animation;
    private _index = 0;
    private _timer: number = 0;
    
    constructor(){
        this._currentAnimationFrame = new Vector(0,0);
    }
    
    public update(){
        if(this._currentAnimation != null){
            this._timer++;
            if(this._timer > this._currentAnimation.speed){
                this._index++;
                if(this._index >= this._currentAnimation.frames.length){
                    this._index = 0;
                }
                this._currentAnimationFrame = this._currentAnimation.frames[this._index];
                this._timer = 0;
            }
        }
    }
    
    private resetTimer(){
        this._timer = 0;
    }
    
    public resetAnimation(){
        this._index = 0;
        this._currentAnimationFrame = this._currentAnimation.frames[this._index];
    }
    
    public setAnimation(animation: Animation){
        this._currentAnimation = animation;
        this._currentAnimationFrame = this._currentAnimation.frames[0];
    }
    
    get index(){return this._index};
    get currentAnimation(){return this._currentAnimation};
    get currentAnimationFrame(){return this._currentAnimationFrame};
    
}