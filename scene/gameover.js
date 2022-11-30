class gameover extends Phaser.Scene {
    constructor(){
        super("GameOver");

    }

    create(){
        this.menubg = this.add.tileSprite(0, 0, 400, 600, "gameover_sheet");
        this.menubg.setOrigin(0,0);

        console.log("GameOver");
    }
}