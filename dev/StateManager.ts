/// <reference path="State.ts" />
/// <reference path="GameState.ts" />
/// <reference path="MenuState.ts" />
/// <reference path="PauseState.ts" />



class StateManager {
    private static currentState: State;
    
    public static setState = (state: State) => {
        StateManager.currentState = state;
    }
    
    public static getState =  () => {
        return StateManager.currentState;
    }
}