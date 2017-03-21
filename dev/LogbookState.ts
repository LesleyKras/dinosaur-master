class LogbookState extends State {

    private _background: Sprite;

    private _selectedItem: number = 0;
    private _dinosaurs: Array<Enemy> = new Array<Enemy>();

    constructor(){
        super();
        this._background = new Sprite('book.png', 960, 640);
        this._dinosaurs.push(new Velociraptor(0,0), new Trex(0,0));
    }
    
    update(){
        if(!this.eventListenersActive){
            this.addEventListeners();
        }
    }
    
    draw(){
        Handler.renderer.fillStyle = 'black';
        Handler.renderer.fillRect(0, 0, Handler.game.width, Handler.game.height);
        Handler.renderer.drawImage(this._background.spriteSheet, 0, 0, this._background.width, this._background.height);
        Handler.renderer.textAlign = 'left';
        Handler.renderer.fillStyle = 'black';
        Handler.renderer.font = '16px pixel';
        Handler.renderer.fillText('Velociraptor', 100, 100);
        Handler.renderer.fillText('T-Rex', 100, 120);
        Handler.renderer.fillText('>',80,100 + this._selectedItem * 20);

        this.drawInfo();

    }

    private drawInfo(){
        Handler.renderer.fillStyle = 'black';
        Handler.renderer.font = '16px pixel';
        Handler.renderer.textAlign = 'left';
        Handler.renderer.fillText(this._dinosaurs[this._selectedItem].name, 550, 100);

        for(let n=0; n<=3; n++){
            //Handler.renderer.fillText(this._dinosaurs[this._selectedItem].info[n], 550, 192 + 64 * n);
            this.wrapText(Handler.renderer, this._dinosaurs[this._selectedItem].info[n], 550, 192 + 90 * n, 300, 18);
        }
    }
    
    private menuHandler = (ev: KeyboardEvent) => {
        if(ev.keyCode == Keys.UP){
            if(this._selectedItem < 1){
                return;
            }
            this._selectedItem--;
        }
        else if(ev.keyCode == Keys.DOWN){
            if(this._selectedItem > 0){
                return;
            }
            this._selectedItem++;
        }
        else if(ev.keyCode == Keys.ESC){
            this.removeEventListeners();
            StateManager.setState(Handler.game.pauseState);
        }
        else if(ev.keyCode == Keys.B){
            this.removeEventListeners();
            StateManager.setState(Handler.game.gameState);
        }
    }
    
    addEventListeners(){
        document.addEventListener('keydown', this.menuHandler);
        this.eventListenersActive = true;
    }
    
    removeEventListeners(){
        document.removeEventListener('keydown', this.menuHandler);
        this.eventListenersActive = false;
    }

    wrapText(context, text, x, y, maxWidth, lineHeight) {
        var cars = text.split("\n");

        for (var ii = 0; ii < cars.length; ii++) {

            var line = "";
            var words = cars[ii].split(" ");

            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + " ";
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;

                if (testWidth > maxWidth) {
                    context.fillText(line, x, y);
                    line = words[n] + " ";
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }

            context.fillText(line, x, y);
            y += lineHeight;
        }
     }
}