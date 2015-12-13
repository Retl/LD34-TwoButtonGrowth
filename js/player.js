Player = function () {
	this.sprite = game.add.sprite(game.width/2, game.height/2, 'player');
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	//  This gets it moving
	this.sprite.body.velocity.setTo(200,200);
	
	//  This makes the game world bounce-able
	this.sprite.body.collideWorldBounds = true;
	
	//  This sets the image bounce energy for the horizontal 
	//  and vertical vectors. "1" is 100% energy return
	this.sprite.body.bounce.set(.5);
	
	this.jumpStrength = 16 * 60; //px p sec, not per frame.
	this.canCharge = true;
	this.velocilock = false;
	
	
	this.actLeftStart = this.jumpLeftStart;
	this.actLeftEnd = this.jumpLeftEnd;
	this.actRightStart = this.jumpRightStart;
	this.actRightEnd = this.jumpRightEnd;
	
	this.chargingRight = false;
	this.chargingLeft = false;
	
	this.chargeRight = 1;
	this.chargeLeft = 1;
	
	this.sprite.update = this.update;
}

Player.prototype.jumpLeftStart = function () {
	if (!this.canCharge) {
		return;
	}
	this.chargingLeft = true;
}

Player.prototype.jumpRightStart = function () {
	if (!this.canCharge) {
		return;
	}
	this.chargingRight = true;
}

Player.prototype.jumpLeftEnd = function () {
	this.chargingLeft = false;
	this.chargeLeft = 1;
	this.applyJumpVelocity(this.chargeLeft * -1);
}

Player.prototype.jumpRightEnd = function () {
	this.chargingRight = false;
	this.chargeRight = 1;
	this.applyJumpVelocity(this.chargeRight);
}

Player.prototype.applyJumpVelocity = function (scaleFactor) {
	this.sprite.body.velocity.setTo((this.jumpStrength / 2 * Math.sign(scaleFactor)) + (this.jumpStrength * scaleFactor / 2),(-this.jumpStrength));
}

Player.prototype.actionLeftStart = function () {
	this.actIfFunction(this.actLeftStart, this.jumpLeftStart);
	/*
	if (typeof this.actLeftStart == "function") {
		
	}
	else {
		this.jumpLeftStart();
	}*/
}


Player.prototype.actionRightStart = function () {
	this.actIfFunction(this.actRightStart, this.jumpRightStart);
	/*
	if (typeof this.actRightStart == "function") {
		
	}
	else {
		this.jumpRightStart();
	}*/
}

Player.prototype.actionLeftEnd = function () {
	this.actIfFunction(this.actLeftEnd, this.jumpLeftEnd);
	/*
	if (typeof this.actLeftEnd == "function") {
		
	}
	else {
		this.jumpLeftEnd();
	}*/
}


Player.prototype.actionRightEnd = function () {
	this.actIfFunction(this.actRightEnd, this.jumpRightEnd); 
	/*
	{
		
	}
	else {
		this.jumpRightEnd();
	}*/
}

Player.prototype.actIfFunction = function (func, defaultFunc) {
	if (typeof func == "function") {
		func()
	}
	else {
		defaultFunc();
	}
}

Player.prototype.toggleVelociLock = function () {
	this.velocilock = !this.velocilock;
}

Player.prototype.update = function () {
	if (this.chargingLeft) {
		this.chargeLeft += (2/60);
	}
	if (this.chargingRight) {
		this.chargeRight += (2/60);
	}
}