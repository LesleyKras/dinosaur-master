/// <reference path="State.ts" />
/// <reference path="Handler.ts" />
/// <reference path="StateManager.ts" />


class PauseState extends State {

    private _selectedItem: number = 0;


    constructor(){
        super();
    }
    
    update(){
        if(!this.eventListenersActive){
            this.addEventListeners();
        }        
    }
    
    draw(){
        Handler.renderer.fillStyle = 'black';
        Handler.renderer.fillRect(0, 0, Handler.game.width, Handler.game.height);
        Handler.renderer.textAlign = 'left';
        Handler.renderer.fillStyle = 'white';
        Handler.renderer.font = '24px pixel';
        Handler.renderer.fillText('Hervat het spel', Handler.game.width / 2 - 300, Handler.game.height / 2 - 50);
        Handler.renderer.fillText('Logboek', Handler.game.width / 2 - 300, Handler.game.height / 2);
        Handler.renderer.fillText('Spel afsluiten', Handler.game.width / 2 - 300, Handler.game.height / 2 + 50);
        Handler.renderer.fillText('->', Handler.game.width / 2 - 350, Handler.game.height / 2 - 50 + (this._selectedItem * 50));
    }
    
    private pauseMenuHandler = (ev: KeyboardEvent) => {
        if(ev.keyCode == Keys.UP){
            if(this._selectedItem < 1){
                return;
            }
            this._selectedItem--;
        }
        else if(ev.keyCode == Keys.DOWN){
            if(this._selectedItem > 1){
                return;
            }
            this._selectedItem++;
        }
        else if(ev.keyCode == Keys.SPACE){
            switch(this._selectedItem){
                case 0:
                    StateManager.setState(Handler.game.gameState);
                    this.removeEventListeners();
                    break;
                case 1:
                    StateManager.setState(Handler.game.logbookState);
                    this.removeEventListeners();
                    break;
                case 2:
                    StateManager.setState(Handler.game.menuState);
                    Handler.game.gameState.resetGame();
                    this.removeEventListeners();
                    break;
            }
        }
        else if(ev.keyCode == Keys.ESC){
            StateManager.setState(Handler.game.gameState);
            this.removeEventListeners();
        }
    }
    
    addEventListeners(){
        document.addEventListener('keydown', this.pauseMenuHandler);
        this.eventListenersActive = true;
    }
    
    removeEventListeners(){
        document.removeEventListener('keydown', this.pauseMenuHandler);
        this.eventListenersActive = false;
    }
}