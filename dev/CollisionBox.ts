class CollisionBox {
    
    private _offsetX: number;
    private _offsetY: number;
    private _width: number;
    private _height: number;
    
    constructor(width:number, height:number, offsetX:number, offsetY:number){
        this._width = width;
        this._height = height;
        this._offsetX = offsetX;
        this._offsetY = offsetY;
    }
    
    get width(){return this._width};
    get height(){return this._height};
    get offsetX(){return this._offsetX};
    set offsetX(n: number){this._offsetX = n};
    get offsetY(){return this._offsetY};
}