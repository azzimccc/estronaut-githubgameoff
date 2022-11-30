window.onload = function(){
    var config = {
        width: 400,
        height: 600,
        backgroundColor: 0x000000,
        scenes: [EstronautGame, Level1, GameOver],
        pixelArt: true,
        physics:
        {
            default: "arcade",
            arcade: 
            {
                debug: false,
            }
        }
    }

    var game = new Phaser.Game(config);
}