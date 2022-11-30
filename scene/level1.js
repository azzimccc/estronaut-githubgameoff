class level1 extends Phaser.Scene {
    constructor(){
        super("Level1");
    }
    create(){
        this.ost = this.sound.add("ost");

        var ostConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        };
        //if need the config
        //this.ost.play(this.ostConfig);
        this.ost.play();
        this.LP = 100;
        this.LV = 1;
        // Create a MappedKeys
        this.keys = new Map([
            ["up", this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I)],
            ["down", this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)],
            ["left", this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)],
            ["right", this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)],
            ["fire", this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z)],
            ["mainmenu", this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)]
        ]);
        //Create Input key
        //createCursorKeys only for up/down/left/right arrow button
        //this.cursorKeys = this.input.keyboard.createCursorKeys();

        //this.keys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); 

        //The background first 
        //this.background = this.add.image(0, 0, "background");
        this.background = this.add.tileSprite(0, 0, this.game.config.width,  this.game.config.height, "background");
        this.background.setOrigin(0,0);

        //Create the player
        //this.player = this.add.image( this.game.config.width / 2,  this.game.config.height / 2, "player");
        this.player = this.physics.add.sprite(this.game.config.width / 2,  this.game.config.height / 2, "player_sheet");

        //Create the player animation => moved to mainmenu.js

        //Play the animation => the animation has been moved to mainmenu.js
        this.player.play("player_anim_idle");

        //Add interactivy => interactive must use the right name for trigger
        this.player.setInteractive();

        //this.input.on('gameobjectdown', this.destroyItem, this);

        //Any UI is created last
        //this.add.text(20, 20, "Level 1.0", {font: "25px Arial", fill: "yellow"});

        this.anims.create({
            key: "gastank_anim",
            frames: this.anims.generateFrameNumbers("gas_tank_sheet", {
              start: 0,
              end: 3
            }),
            frameRate: 20,
            repeat: -1
          });

        // 3.1
        this.physics.world.setBoundsCollision();
        this.player.setCollideWorldBounds(true);
        this.gasTanks = this.physics.add.group();
        
        // 2.2 Add multiple objects
        this.resetObj();

        //this.physics.add.collider(this.player, this.gasTanks);
        this.physics.add.overlap(this.player, this.gasTanks, this.damagePlayer, null, this);

        //Any UI is created last
        this.LVLabel = this.add.text(20, 10, this.LP, {font: "25px Arial", fill: "blue"});
        this.LPLabel = this.add.text(20, 40, this.LP, {font: "25px Arial", fill: "red"});
    }

    resetObj(){
        var maxObjects = 4 * this.LV;
        for (var i = 0; i <= maxObjects; i++) {

            var gastank = this.physics.add.sprite(32, 32, "gas_tank_sheet");
            this.gasTanks.add(gastank);
            gastank.setRandomPosition(0, 0, this.game.config.width, this.game.config.height);
            
            // set animation
            gastank.play("gastank_anim");
            
            // setVelocity
            gastank.setVelocity(100, 100);
            // 3.2
            gastank.setCollideWorldBounds(true);
            // 3.3
            gastank.setBounce(1);
            gastank.setInteractive();

            this.input.on('gameobjectdown', this.destroyItem, this);
        }
    }

    moveItem(item, speed){
        //item.x -= speed;
        item.y += (speed * (this.LV / 2));

        if(item.y >= this.game.config.height)
        //if(item.x <= 0)
            this.resetItem(item);
    }

    resetItem(item)
    {
        item.y  = 0;
        var randomX = Phaser.Math.Between(0, this.game.config.width);
        item.x = randomX;

        //item.x = this.game.config.width;
        //var randomY = Phaser.Math.Between(this.game.config.height / 2, this.game.config.height);
        //item.y = randomY;
    }

    update(){
        //this.moveItem(this.player, 3);

        this.controlItem();

        //Single tap
        if(Phaser.Input.Keyboard.JustDown(this.keys.get("fire")))
        {
            console.log("Fire");
        }

        //Return to mainmenu
        if(Phaser.Input.Keyboard.JustDown(this.keys.get("mainmenu")))
        {
            console.log("To main menu");
            this.scene.start("EstronautGame");
        }

        //Update background
        //this.background.tilePositionX -= 0.5;
        this.destroyed = 0;
        this.background.tilePositionY -= 0.5 + (this.LV - 1);
        this.LVLabel.destroy();
        this.LVLabel = this.add.text(20, 10, "LV : " + this.LV, {font: "25px Arial", fill: "blue"});
        this.LPLabel.destroy();
        this.LPLabel = this.add.text(20, 40, "LP : " + this.LP, {font: "25px Arial", fill: "red"});

        if(this.LP <= 0)
        {
            //console.log("Game Over");
            this.scene.start("GameOver");
        }
    }

    //Control the Item:Player
    controlItem()
    {
        //Phaser.Input.Keyboard.KeyCodes.A
        //if(this.cursorKeys.A.isDown)
        //if(this.keys.isDown)
        if(this.keys.get("up").isDown)
        {
            //console.log("A is pressed");
            //console.log("To main menu");
            //this.scene.start("EstronautGame");
            this.player.y -= this.LV;
        }
        if(this.keys.get("down").isDown)
        {
            //console.log("A is pressed");
            this.player.y += this.LV;
        }
        if(this.keys.get("left").isDown)
        {
            //console.log("A is pressed");
            this.player.x -= this.LV;
        }
        if(this.keys.get("right").isDown)
        {
            //console.log("A is pressed");
            this.player.x += this.LV;
        }
    }
    //Header for button down
    destroyItem(pointer, gasTank){
        gasTank.setTexture("explosion");
        gasTank.play("explode");

        this.destroyed++;

        if(this.destroyed >= 4 * this.LV)
        {
            this.LV++;
            this.resetObj();

            this.destroyed = 0;
        }

        //gasTank.destroy();
    }

    damagePlayer(player, gasTank){
        gasTank.setTexture("explosion_sheet");
        gasTank.play("explode");

        this.LP -= 10 * this.LV;
        //console.log(this.LP);

        this.destroyed++;

        if(this.destroyed >= 4 * this.LV)
        {
            this.LV++;
            this.resetObj();
            this.destroyed = 0;
        }

        gasTank.destroy();
        //this.checkDestroyed();
    }
}