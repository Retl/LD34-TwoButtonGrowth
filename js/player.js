Player = function () {
	this.touchingBubble = null;
	this.sprite = game.add.sprite(game.width/2, game.height/2, 'player');
	this.sprite.owner = this;
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	//  This gets it moving
	this.sprite.body.velocity.setTo(200,200);
	
	//  This makes the game world bounce-able
	this.sprite.body.collideWorldBounds = true;
	
	//  This sets the image bounce energy for the horizontal 
	//  and vertical vectors. "1" is 100% energy return
	this.sprite.body.bounce.set(.5);
	
	this.jumpStrength = 8 * 60; //px p sec, not per frame.
	this.brakeStrength = 1 / 4 * 60; //px p sec, not per frame.
	this.canCharge = true;
	this.velocilock = false;
	this.vLockX = 0;
	this.vLockY = 0;
	
	
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
	if (!this.canChargeLeft) {
		return;
	}
	this.chargingLeft = true;
	this.canChargeLeft = false;
	this.chargeLeft = 1;
}

Player.prototype.jumpRightStart = function () {
	if (!this.canChargeRight) {
		return;
	}
	this.chargingRight = true;
	this.canChargeRight = false;
	this.chargeRight = 1;
}

Player.prototype.jumpLeftEnd = function () {
	if (!this.canChargeLeft) {
		this.applyJumpVelocity(this.chargeLeft * -1);
		this.chargeLeft = 0;
		this.chargingLeft = false;
		return;
	}
	this.chargingLeft = false;
	this.applyJumpVelocity(this.chargeLeft * -1);
	this.chargeLeft = 1;
}

Player.prototype.jumpRightEnd = function () {
	if (!this.canChargeRight) {
		this.applyJumpVelocity(this.chargeRight);
		this.chargeRight = 0;
		this.chargingRight = false;
		return;
	}
	
	this.chargingRight = false;
	this.applyJumpVelocity(this.chargeRight);
	this.chargeRight = 1;
}

Player.prototype.applyJumpVelocity = function (scaleFactor) {
	if (scaleFactor == 0) {return}
	//this.sprite.body.velocity.setTo((this.jumpStrength / 2 * Math.sign(scaleFactor)) + (this.jumpStrength * scaleFactor / 2),(-this.jumpStrength));
	var xVel = (this.jumpStrength / 2 * Math.sign(scaleFactor)) + (this.jumpStrength * scaleFactor / 2);
	var yVel = -(this.jumpStrength * Math.abs(scaleFactor));
	this.sprite.body.velocity.setTo(xVel,yVel);
	if (this.touchingBubble) {
		this.touchingBubble.sprite.body.velocity.add(xVel/2,-(yVel / 4));
		this.touchingBubble.touched = true;
		this.touchingBubble = null;
	}
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

Player.prototype.setVelociLock = function (tog) {
	if (typeof tog != "undefined") {this.velocilock = tog;}
	else{
		this.velocilock = !this.velocilock;
	}
	this.vLockX = this.sprite.body.velocity.x;
	this.vLockY = this.sprite.body.velocity.y;
}

Player.prototype.update = function () {
	game.physics.arcade.collide(this, grp_bubbles, 
		this.bubbleCollide, null, this);
	
	if (this.velocilock){
		this.sprite.body.velocity.setTo(this.vLockX,this.vLockY);
	}
	
	if (this.body.onFloor()){
		this.owner.canChargeLeft = true;
		this.owner.canChargeRight = true;
	}
	if (this.owner.chargingLeft) {
		this.owner.chargeLeft += (2/60);
		if (this.owner.chargeLeft > 5) {this.owner.chargeLeft = 5}
	}
	if (this.owner.chargingRight) {
		this.owner.chargeRight += (2/60);
		if (this.owner.chargeRight > 5) {this.owner.chargeRight = 5}
	}
}

Player.prototype.bubbleCollide = function (p, b) {
	if (!b.owner.touched && !p.owner.touchingBubble) {
		p.owner.touchingBubble = b.owner;
		p.velocity.setTo(b.velocity.x, b.velocity.y);
		p.setVelocilock(); 
		p.owner.canChargeLeft = true;
		p.owner.canChargeRight = true;
	}
}