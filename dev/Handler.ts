class Handler {
    private static _renderer: CanvasRenderingContext2D;
    private static _game: Game;
    private static _player: Player;
    private static _activeCamera: Camera;
    private static _enemies: Array<Enemy>;

    private static _world: World;

    private static _pickups: Array<Pickup>;

    
    public static setEnemies(enemies: Array<Enemy>){
        Handler._enemies = enemies;
    }
    
    public static setRenderer = (ctx: CanvasRenderingContext2D) => {
        Handler._renderer = ctx;
    }
    
    public static setWorld(world: World){
        Handler._world = world;
    }
    
    public static setActiveCamera = (cam: Camera) => {
        Handler._activeCamera = cam;
    }
    
    public static setGame = (game: Game) => {
        Handler._game = game;
    }
    
    public static setPlayer = (player: Player) => {
        Handler._player = player;
    }

    public static setPickups(pickups: Array<Pickup>){
        Handler._pickups = pickups;
    }
    
    static get renderer(){return Handler._renderer};
    static get game(){return Handler._game};
    static get player(){return Handler._player};
    static get activeCamera(){return Handler._activeCamera};
    static get enemies(){return Handler._enemies};

    static get world(){return this._world};

    static get pickups(){return Handler._pickups};

}