Bubble = function (xpos, ypos, size) {
	if (typeof xpos == "undefined") {
			xpos = Math.floor(Math.random()*game.width);
		}
	if (typeof ypos == "undefined") {
			ypos = game.world.height / 4;
		}
		
	this.touched = false;
	
	this.sprite = game.add.sprite(xpos, ypos, 'disc_blue');
	this.sprite.mark = false;
	grp_bubbles.add(this.sprite);
	this.sprite.owner = this;
	
	this.size = Math.abs(size) || 1;
	
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.allowGravity = false;
	//  This gets it moving
	var randX = (Math.random()*(4*60)) - (2 * 60);
	var randY = -Math.abs((Math.random()*(4*60)) - (2 * 60));
	this.sprite.body.velocity.setTo(randX, randY);
	
	//  This makes the game world bounce-able
	this.sprite.body.collideWorldBounds = true;
	
	//  This sets the image bounce energy for the horizontal 
	//  and vertical vectors. "1" is 100% energy return
	this.sprite.body.bounce.set(.5);
	
	this.jumpStrength = 8 * 60; //px p sec, not per frame.
	this.brakeStrength = 1 / 4 * 60; //px p sec, not per frame.
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

Bubble.prototype.jumpLeftStart = function () {
	if (!this.canChargeLeft) {
		return;
	}
	this.chargingLeft = true;
	this.canChargeLeft = false;
}

Bubble.prototype.jumpRightStart = function () {
	if (!this.canChargeRight) {
		return;
	}
	this.chargingRight = true;
	this.canChargeRight = false;
}

Bubble.prototype.jumpLeftEnd = function () {
	if (!this.canChargeLeft) {
		return;
	}
	this.canChargeLeft = false;
	this.chargingLeft = false;
	this.applyJumpVelocity(this.chargeLeft * -1);
	this.chargeLeft = 1;
}

Bubble.prototype.jumpRightEnd = function () {
	if (!this.canChargeRight) {
		return;
	}
	
	this.chargingRight = false;
	this.applyJumpVelocity(this.chargeRight);
	this.chargeRight = 1;
}

Bubble.prototype.applyJumpVelocity = function (scaleFactor) {
	this.sprite.body.velocity.setTo((this.jumpStrength / 2 * Math.sign(scaleFactor)) + (this.jumpStrength * scaleFactor / 2),(-this.jumpStrength));
}

Bubble.prototype.actionLeftStart = function () {
	this.actIfFunction(this.actLeftStart, this.jumpLeftStart);
	/*
	if (typeof this.actLeftStart == "function") {
		
	}
	else {
		this.jumpLeftStart();
	}*/
}


Bubble.prototype.actionRightStart = function () {
	this.actIfFunction(this.actRightStart, this.jumpRightStart);
	/*
	if (typeof this.actRightStart == "function") {
		
	}
	else {
		this.jumpRightStart();
	}*/
}

Bubble.prototype.actionLeftEnd = function () {
	this.actIfFunction(this.actLeftEnd, this.jumpLeftEnd);
	/*
	if (typeof this.actLeftEnd == "function") {
		
	}
	else {
		this.jumpLeftEnd();
	}*/
}


Bubble.prototype.actionRightEnd = function () {
	this.actIfFunction(this.actRightEnd, this.jumpRightEnd); 
	/*
	{
		
	}
	else {
		this.jumpRightEnd();
	}*/
}

Bubble.prototype.actIfFunction = function (func, defaultFunc) {
	if (typeof func == "function") {
		func()
	}
	else {
		defaultFunc();
	}
}

Bubble.prototype.toggleVelociLock = function () {
	this.velocilock = !this.velocilock;
}

Bubble.prototype.update = function () {
	game.physics.arcade.collide(this, grp_bubbles, 
		this.owner.bubbleCollide, null, this);
	//console.log(this);
	var drawScale = this.owner.size;
	if (drawScale > 15) {
		drawScale = 15;
	}
	if (drawScale < 0.5) {
		drawScale = 0.5;
	}
	this.scale.setMagnitude(drawScale);
	
	if (this.bottom >= game.height){
		addScore(Math.floor(Math.pow(2,this.owner.size)));
		if (grp_bubbles.countLiving() < 256) {
			lastBubble = new Bubble(null, null, this.owner.size / 1.5);
			lastBubble = new Bubble(null, null, this.owner.size / 1.5);
		}
		grp_bubbles.removeChild(this);
		this.kill();
	}
	if (this.owner.chargingLeft) {
		this.owner.chargeLeft += (2/60);
	}
	if (this.owner.chargingRight) {
		this.owner.chargeRight += (2/60);
	}
	grp_bubbles.forEach(function(bub) {
    if (bub.mark){bub.kill();}
  });
}

Bubble.prototype.bubbleCollide = function (b1, b2) {
	if (b1.body.velocity.getMagnitude() < b2.body.velocity.getMagnitude()) {
		b2.owner.size += b1.owner.size;
		//grp_bubbles.removeChild(b1);
		//b1.kill();
		b1.mark = true;
	}
	else
	{
		b1.owner.size += b2.owner.size;
		//grp_bubbles.removeChild(b2);
		//b2.kill();
		b2.mark = true;
	}
}