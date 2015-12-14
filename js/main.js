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
var score;

var player;
var lastBubble;
var grp_bubbles;

function create() {
    //game.world.setBounds(480, 900);
    resetScore();
    input = new Input();
    
    grp_bubbles = game.add.group();
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.setTo(0,16*60);

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
    //player = game.add.sprite(0, 0, 'flyer');
    player = new Player();
    lastBubble = new Bubble();
    lastBubble2 = new Bubble();
    
    game.camera.follow(player.sprite);

}

function update () {

    //nothing required here
    
}

function render () {
  try {
    //debug helper
    if (player.sprite) {
      game.debug.spriteInfo(player.sprite,32,32);
    }
    if (lastBubble.sprite) {
      game.debug.spriteInfo(lastBubble.sprite,32,160);
    }
    if (player && player.sprite) {
      game.debug.text(score, 0, 0);
      game.debug.text("ChargeLeft: "+ player.chargeLeft, 16, (game.height - 16));
      game.debug.text("ChargeRight: "+ player.chargeRight, 16, (game.height - 32));
      game.debug.text("LCharagable: "+ player.canChargeLeft, 16, (game.height - 48));
      game.debug.text("RChargable: "+ player.canChargeRight, 16, (game.height - 64));
      game.debug.text("Score: "+ score, 16, (game.height - 96));
    }
  }
  catch (err) {
    console.log(err);
  }

}

function resetScore() {
  score = 0;
}

function addScore(pts) {
  score += pts;
}