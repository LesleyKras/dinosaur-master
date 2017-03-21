abstract class State {
    
    protected eventListenersActive: boolean = false
    
    constructor(){

    }
    
    abstract update();
    abstract draw();
    abstract addEventListeners();
    abstract removeEventListeners();
}