class mainmenu extends Phaser.Scene {
    constructor(){
        super("EstronautGame");

    }

    //Used to preload stuff - duh
    preload(){
        this.load.image("background", "assets/images/background.jpeg")
        this.load.image("gameover_sheet", "assets/images/gameover.jpeg")
        //this.load.image("player", "assets/images/player.png");

        this.load.image("button_image", "assets/images/startbutton.png")
        this.load.image("button_image_pressed", "assets/images/startbutton_pressed.png")

        this.load.spritesheet("player_sheet", "assets/images/player.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.spritesheet("gas_tank_sheet", "assets/images/gastank.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.spritesheet("mainmenu_sheet", "assets/images/mainmenuscreen.png", {
            frameWidth: 400,
            frameHeight: 600,
        });

        this.load.spritesheet("explosion_sheet", "assets/images/explosion_scaled.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        //Load audio
        this.load.audio("ost", "assets/audio/Game-Over-final.mp3");

    }

    //Used to add object 
    create(){
        //text parameter (x-axis, y-axis, the text)
        //this.add.text(20, 20, "Loading game....");

        this.menubg = this.add.tileSprite(0, 0, this.game.config.width,  this.game.config.height, "mainmenu_sheet");
        this.menubg.setOrigin(0,0);

        this.menubutton = this.add.image(this.game.config.width / 4, this.game.config.height / 3, "button_image");
        this.menubutton.setScale(0.5);
        this.menubutton.setOrigin(0,0);

        this.menubutton.setInteractive();
        this.input.on('gameobjectdown', this.startGame, this);
        this.input.on('pointerover', this.darkbutton, this);
        this.input.on('pointerout', this.lightbutton, this);
        //Scene start take name given in scene super constuctor
       //this.scene.start("Level1");

        //Create Animation
        //Create the player animation
        this.anims.create({
            key: "player_anim_idle",
            frames: this.anims.generateFrameNumbers("player_sheet"),
            frameRate: 20,
            repeat: -1, //-1 means infinite
            //repeat: 0,    // For explosion meaning animate once and disappear
            //hideOnComplete: true  // For explosion
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion_sheet"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
          });
    }

    startGame()
    {
        //this.menubutton.setTexture('button_image_pressed');
        console.log("Starting new game");

        // The scene name is the same as the one declared in super
        this.scene.start("Level1");
    }

    darkbutton()
    {
        this.menubutton.setTexture('button_image_pressed');
    }

    lightbutton()
    {
        this.menubutton.setTexture('button_image');
    }
}