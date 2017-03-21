/// <reference path="State.ts" />
/// <reference path="Game.ts" />


class MenuState extends State {

    private backgroundImage = new Sprite("background.jpg", 3840, 2160);
    private logo = new Sprite("logo.png", 252, 28);
    
    constructor(){
        super();
    }
    
    update(){
        if(!this.eventListenersActive){
            this.addEventListeners();
        }
        
    }
    
    draw(){
        this._drawBackground();
        this._drawGUI();
    }
    
    private _drawBackground = () => {
        Handler.renderer.drawImage(this.backgroundImage.spriteSheet, 0,0,Handler.game.width, Handler.game.height);
    }
    
    private _drawGUI = () => {
        Handler.renderer.drawImage(this.logo.spriteSheet, Handler.game.width / 2 - this.logo.spriteSheet.width * 2 / 2, Handler.game.height / 3 - this.logo.spriteSheet.height * 2 / 2, 252 * 2, 28 * 2);
        Handler.renderer.fillStyle = 'white';
        Handler.renderer.font = '35px pixel';
        Handler.renderer.textAlign = "center";
        Handler.renderer.fillText('- Press SPACE to start -', Handler.game.width / 2 , Handler.game.height / 2  + 100);
    }
    
    private _startGame = (ev:KeyboardEvent) => {
        if(ev.keyCode == Keys.SPACE){
            this.removeEventListeners();
            StateManager.setState(Handler.game.gameState);
        }
    }
    
    addEventListeners(){
        document.addEventListener('keydown', this._startGame);
        this.eventListenersActive = true;
    }
    
    removeEventListeners(){
        document.removeEventListener('keydown', this._startGame);
        this.eventListenersActive = false;
    }

}