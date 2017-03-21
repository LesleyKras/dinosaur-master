class Animation {
    private _speed: number = 5;
    private _frames: Array<Vector>;
    
    constructor(...frames: Vector[]){
        this._frames = new Array<Vector>();
        for(let n=0; n<frames.length; n++){
            this._frames.push(frames[n]);
        }
    }
    
    get frames(){return this._frames};
    
    set speed(speed: number){this._speed = speed};
    get speed(){return this._speed};
}