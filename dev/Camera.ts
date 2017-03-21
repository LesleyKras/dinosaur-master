class Camera extends GameObject {
    
    private _followTarget: GameObject;
    private _offset: Vector;
    
    constructor(){
        super(0, 0);
    }
    
    public setFollowTarget(target: GameObject, offset?: Vector){
        this._followTarget = target;
        if(offset != null){
            this._offset = offset;
        } else {
            this._offset = new Vector(0,0);
        }
    }
    
    update = () => {
        if(this._followTarget != null){
            this.position.x = this._followTarget.position.x + this._offset.x - Handler.game.width / 2;
            this.position.y = Handler.game.height / 2 + this._offset.y;
        }
    }
}