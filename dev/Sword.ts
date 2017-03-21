class Sword {
    
    private _sprite: Sprite;
    
    constructor(){
        this._sprite = new Sprite('swordx2.png', 64, 64);
    }
    
    get sprite(){return this._sprite};
}