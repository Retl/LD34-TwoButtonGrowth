// Based on code from:
//    http://phaser.io/examples/v2/arcade-physics/bounce
//    http://phaser.io/examples/v2/arcade-physics/platformer-tight

var game = new Phaser.Game(480, 800, Phaser.CANVAS, 'ld34', { preload: preload, create: create, update: update, render: render });

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('block_pink', './img/block_32x_pink.png');
    game.load.image('block_white', './img/block_32x_white.png');
    game.load.image('block_yellow', './img/block_32x_yellow.png');
    game.load.image('block_blue', './img/block_32x_blue.png');
    game.load.image('block_clear', './img/block_32x_clear.png');
    
    game.load.image('disc_pink', './img/disc_32x_white.png');
    game.load.image('disc_white', './img/disc_32x_white.png');
    game.load.image('disc_yellow', './img/disc_32x_yellow.png');
    game.load.image('disc_blue', './img/disc_32x_blue.png');
    
    game.load.image('player', './img/hbun.png');
}

var input;

var player;
var grp_bubbles;

function create() {
    resetScore();
    input = new Input();
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.setTo(0,16*60);

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
    //player = game.add.sprite(0, 0, 'flyer');
    player = new Player();

}

function update () {

    //nothing required here
    
}

function render () {

    //debug helper
    if (player.sprite) {
      game.debug.spriteInfo(player.sprite,32,32);
    }
    if (player) {
      game.debug.text(score, 0, 0);
      game.debug.text(player.chargeLeft);
    }

}

function resetScore() {
  score = 0;
}

function addScore(pts) {
  score += pts;
}