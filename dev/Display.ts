class Display {
    private width: number;
    private height: number;
    private canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    
    public static _flashTime: number = 50;
    
    constructor(width:number, height:number){
        this.canvas = document.createElement('canvas');
        
        this.width = this.canvas.width = width;
        this.height = this.canvas.height = height;
        
        this._ctx = this.canvas.getContext('2d');
        
        document.body.appendChild(this.canvas);
        console.log('canvas created!');
    }
    
    public static screenFlash(){
        if(Display._flashTime > 0){
            Handler.renderer.fillStyle = 'rgba(255,0,0,' + Display._flashTime / 100 + ')';
            Handler.renderer.fillRect(0, 0, Handler.game.width, Handler.game.height);
            if(Display._flashTime > 0)
                Display._flashTime -= 5;
        }
    }

    

    get ctx(){return this._ctx};

}