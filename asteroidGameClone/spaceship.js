class Spaceship {
  ///////// GLOBAL VARIABLES /////////////
  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;  // No friction in space and velocity limited by maxVelocity
    this.bulletSys = new BulletSystem();
    this.size = 50;
    this.prevLocation = new createVector(width/2, height/2);
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    imageMode(CENTER);
    image(UFOImg, this.location.x,this.location.y,this.size,this.size);
  }

  move(){
      this.velocity.add(this.acceleration);// Update Spaceship to move with velocity + acceleration
      this.velocity.limit(this.maxVelocity);// Set the maximum velocity value
      this.location.add(this.velocity); // Updates location of the Spaceship
      this.acceleration.mult(0); // Resets the accel to 0 to prevent accumulation of acceleration
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
        this.thrusters();
      }
      if (keyIsDown(RIGHT_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0.1,0)); // X axis gets increased, Y axis does not change
        this.thrusters();
      }
      if (keyIsDown(UP_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0,-0.1));// Y axis gets decreased, X axis does not change
        this.thrusters();
      }
      if (keyIsDown(DOWN_ARROW)){
      // YOUR CODE HERE (1 line)
       this.applyForce(createVector(0,0.1));// Y axis gets increased, X axis does not change
       this.thrusters();
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }
  // Code prevent the spaceship to leave over the edges of screen
  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
    var gravity = createVector(0,0.05);
    this.applyForce(gravity);  // Apply Earth's Gravity;

    var friction = this.velocity.copy();
    friction.mult(-1);
    friction.mult(1/30);
    this.applyForce(friction); // Apply Friction in Atmosphere
  }

  thrusters(){
    //After each frame the current location becomes the prevLocation
    this.prevLocation = this.location.copy();
    //////////////// LEFT ARROW KEY RIGHT FLAMES /////////////
    if (keyIsDown(LEFT_ARROW)){
    fill(255,0,0);
    ellipse(this.prevLocation.x+35,this.prevLocation.y,25,15);
    fill(255,165,0);
    ellipse(this.prevLocation.x+30,this.prevLocation.y,15,8);
    }
    //////////////// RIGHT ARROW KEY LEFT FLAMES /////////////
    if (keyIsDown(RIGHT_ARROW)){
      fill(255,0,0);
      ellipse(this.prevLocation.x-35,this.prevLocation.y,25,15);
      fill(255,165,0);
      ellipse(this.prevLocation.x-30,this.prevLocation.y,15,8);
      }
    //////////////// UP ARROW KEY DOWNWARD FLAMES /////////////
    if (keyIsDown(UP_ARROW)){
      fill(255,0,0);
      ellipse(this.prevLocation.x,this.prevLocation.y+30,15,30);
      fill(255,165,0);
      ellipse(this.prevLocation.x,this.prevLocation.y+22,8,15);
      }
    //////////////// DOWN ARROW KEY UPWARD FLAMES /////////////
    if (keyIsDown(DOWN_ARROW)){
      fill(255,0,0);
      ellipse(this.prevLocation.x-20,this.prevLocation.y-18,10,20);
      ellipse(this.prevLocation.x+20,this.prevLocation.y-18,10,20);
      fill(255,165,0);
      ellipse(this.prevLocation.x-20,this.prevLocation.y-13,8,15);
      ellipse(this.prevLocation.x+20,this.prevLocation.y-13,8,15);
      }
  }
}
