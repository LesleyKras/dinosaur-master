class Launcher {
    public static main = () => {
        let game = new Game(960, 640);
        game.start();
    }
}

window.onload = Launcher.main;