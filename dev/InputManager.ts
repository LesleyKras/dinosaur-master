class InputManager {
    private static keysPressed: Array<number> = new Array<number>();
    
    public static init = () => {
        document.addEventListener('keydown', InputManager.keydownHandler);
        document.addEventListener('keyup', InputManager.keyupHandler);
        
    }
    
    private static keydownHandler = (e:KeyboardEvent) => {
        if(InputManager.keysPressed.indexOf(e.keyCode) < 0){
            InputManager.keysPressed.push(e.keyCode);
        }
    }
    
    private static keyupHandler = (e:KeyboardEvent) => {
        if(InputManager.keysPressed.indexOf(e.keyCode) > -1){
            InputManager.keysPressed.splice(InputManager.keysPressed.indexOf(e.keyCode), 1);
        }
    }
    
    public static keyPressed = (keycode: number) => {
        if(InputManager.keysPressed.indexOf(keycode) > -1 ){
            return true;
        } else {
            return false;
        }
    }
}

enum Keys {
    W = 87,
    S = 83,
    A = 65,
    D = 68,
    UP = 38,
    DOWN = 40,
    LEFT = 37,
    RIGHT = 39,
    SPACE = 32,
    ESC = 27,
    BACKSLASH = 220,
    B = 66
}