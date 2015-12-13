var Input = function () {
	this.keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.Z);
	this.keyRight = game.input.keyboard.addKey(Phaser.Keyboard.X);
	
	this.bindPresses();
	this.bindReleases();
};

Input.prototype.bindPresses = function () {
	this.keyLeft.onDown.add(function () {player.jumpLeftStart();}, player);
	this.keyRight.onDown.add(function () {player.jumpRightStart();}, player);
};

Input.prototype.bindReleases = function () {
	this.keyLeft.onUp.add(function () {player.jumpLeftEnd();}, player);
	this.keyRight.onUp.add(function () {player.jumpRightEnd();}, player);
};