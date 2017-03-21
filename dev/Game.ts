
/// <reference path="Display.ts" />
/// <reference path="GameState.ts" />
/// <reference path="State.ts" />
/// <reference path="MenuState.ts" />
/// <reference path="PauseState.ts" />

/// <reference path="Vector.ts" />
/// <reference path="InputManager.ts" />
/// <reference path="StateManager.ts" />





class Game {
    private display: Display;
    public width: number;
    public height: number;
   
    public debugMode: boolean = false;
    
    private fps: number = 60;
    private timestep: number = 1000 / this.fps;
    private framesThisSecond: number = 0;
    private lastFrameTime: number = 0;
    private limit: number = 240;
    private dt: number = 0;
    
    private isRunning: boolean = false;
    
    private _gameState: GameState;
    private _logbookState: LogbookState;
    private _menuState: MenuState;
    private _pauseState: PauseState;
    
    constructor(width:number, height:number){
        this.width = width;
        this.height = height;
        Handler.setGame(this);
        
        console.log('game created!');
    }
    
    start = () => {
        console.log('game started!')
        if(!this.isRunning){
            this.isRunning = true;
            this.init();
        }  
    }
    
   private init = () => {
        this.display = new Display(this.width, this.height);
        
        this.lastFrameTime = 0;
        this.dt = 0;
        
        InputManager.init();
        
        this._gameState = new GameState();
        this._menuState = new MenuState();
        this._logbookState = new LogbookState();
        this._pauseState = new PauseState();
        StateManager.setState(this._menuState);
        
        Handler.setRenderer(this.display.ctx);
        
        requestAnimationFrame(this.loop);
    }
    
    private loop = (timestamp:number) => {
        
        if(timestamp < this.lastFrameTime + (1000 / this.fps)){
            requestAnimationFrame(this.loop);
            return;
        }
        
        this.dt += timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;
        
        let numUpdateSteps:number = 0;
        while(this.dt >= this.timestep){
            this.update(this.timestep);
            this.dt -= this.timestep;
            if(++numUpdateSteps >= this.limit){
                this.panic();
                break;
            }
        }
        
        this.draw();
        
        requestAnimationFrame(this.loop);
    }
    
    private update = (dt: number) => {

        if(StateManager.getState() != null){
            StateManager.getState().update();            
        }
        

    }
    
    private draw = () => {
        if(StateManager.getState() != null){
            StateManager.getState().draw();            
        }
    }
    
    private panic = () => {
        this.dt = 0;
    }
    
    stop = () => {
        if(this.isRunning){
            this.isRunning = false;
        }
    }
    
    public toggleDebugMode = (ev: KeyboardEvent) => {
        if(ev.keyCode == Keys.BACKSLASH)
            this.debugMode = !this.debugMode;
    }

    get gameState(){return this._gameState};
    get menuState(){return this._menuState};
    get logbookState(){return this._logbookState};
    get pauseState(){return this._pauseState};

}